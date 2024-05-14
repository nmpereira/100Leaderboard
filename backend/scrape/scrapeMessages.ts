import axios from "axios";
import dotenv from "dotenv";
import User from "../models/User";
import { MessageSearchResponse } from "../types/UserTypes";
import sleep from "../helpers/sleep";
import writeMessagesToDb from "../helpers/writeMessagesToDb";

dotenv.config();

const { GUILD_ID, DISCORD_TOKEN } = process.env;

const getAUser = async (): Promise<string | null> => {
	try {
		// find Random User that wasnt scraped in the last 24 hours
		const user = await User.aggregate([
			{
				$match: {
					to_scrape: false,
					// less than 24 hours ago or is null
					$or: [
						{
							messages_last_scraped_at: {
								$lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
							},
						},
						{ messages_last_scraped_at: null },
					],
				},
			},
			{ $sample: { size: 1 } },
		]);

		console.log({ user });

		return user[0].disc_id || null;
	} catch (err) {
		console.error(err);
		return null;
	}
};

const scrapeMessages = async (): Promise<void> => {
	try {
		const time_start = new Date().getTime();
		const userToFetch = await getAUser();

		if (!userToFetch) {
			console.log("No users to scrape messages from.");
			return;
		}

		const baseUrl = `https://discord.com/api/v9/guilds/${GUILD_ID}/messages/search?author_id=${userToFetch}`;

		const headers = {
			authorization: `${DISCORD_TOKEN}`,
		};

		console.log(`Scraping messages for user ${userToFetch}`);

		const response = (await axios.get(baseUrl, { headers })) as {
			data: MessageSearchResponse;
		};

		const results = response.data;

		await writeMessagesToDb({ results, user: userToFetch });

		console.log(
			`Scraped messages for user ${userToFetch} | Time taken: ${(new Date().getTime() - time_start) / 1000}s`
		);

		await sleep({ min: 5, max: 10 });

		await scrapeMessages();
	} catch (err) {
		console.error(err);
	}
};

export default scrapeMessages;
