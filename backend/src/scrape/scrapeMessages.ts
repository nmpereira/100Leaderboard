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
		const user = (await User.aggregate([
			{
				$addFields: {
					priorityScore: {
						$cond: [
							{
								$eq: ["$messages_last_scraped_at", null],
							},
							1000, // Assign a high score if messages_last_scraped_at is null
							{
								$add: [
									100, // Base score
									{
										$cond: [
											{
												$gte: [
													{
														$subtract: [
															new Date(),
															"$messages_last_scraped_at",
														],
													},
													36 * 60 * 60 * 1000, // 36 hours in milliseconds
												],
											},
											0, // If messages_last_scraped_at is within 36 hours, no additional score
											{
												$multiply: [
													"$total_message_count",
													10,
												], // Additional score based on total_message_count
											},
										],
									},
								],
							},
						],
					},
				},
			},
			{
				$match: {
					to_scrape: "yes",
					$or: [
						{ messages_last_scraped_at: null },
						{
							messages_last_scraped_at: {
								$gte: new Date(
									new Date().getTime() - 36 * 60 * 60 * 1000
								), // More than 36 hours ago
							},
						},
					],
				},
			},
			{
				$sample: { size: 1 },
			},
		])) as InstanceType<typeof User>[];

		console.log("Selected user:", user);

		return user && user.length > 0 ? user[0].disc_id : null;
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
