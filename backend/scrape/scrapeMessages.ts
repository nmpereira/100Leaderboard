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
		const users = await User.aggregate([
			{
				$match: {
					to_scrape: false,
					$or: [
						{ messages_last_scraped_at: null },
						{
							messages_last_scraped_at: {
								$lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
							},
						},
					],
				},
			},
			{
				$project: {
					user: "$$ROOT",
					weight: {
						$cond: {
							if: { $gte: ["$total_message_count", 10] },
							then: {
								$add: [
									{
										$multiply: [
											{
												$cond: {
													if: "$messages_last_scraped_at",
													then: {
														$divide: [
															1,
															{
																$subtract: [
																	new Date(),
																	"$messages_last_scraped_at",
																],
															},
														],
													},
													else: 0,
												},
											},
											2,
										],
									},
									1,
								],
							}, // For total_message_count >= 10
							else: 1, // For total_message_count < 10
						},
					},
				},
			},
		]);

		if (users.length < 1) {
			console.log("No matching users found.");
			return null;
		}

		// Calculate the total sum of weights
		const totalWeight = users.reduce((sum, user) => sum + user.weight, 0);

		// Generate a random number within the total sum of weights
		const randomWeight = Math.random() * totalWeight;

		// Iterate through users, summing up weights until random number falls within a user's weight range
		let cumulativeWeight = 0;
		let selectedUser = null;
		for (const user of users) {
			cumulativeWeight += user.weight;
			if (randomWeight <= cumulativeWeight) {
				selectedUser = user;
				break;
			}
		}

		console.log("Selected user:", selectedUser);

		return selectedUser ? selectedUser.disc_id : null;
	} catch (err) {
		console.error(err);
		return null;
	}
};

const scrapeMessages = async (): Promise<void> => {
	try {
		// const time_start = new Date().getTime();
		// const userToFetch = await getAUser();

		findManyUsers();
		return;

		// if (!userToFetch) {
		// 	console.log("No users to scrape messages from.");
		// 	return;
		// }

		// const baseUrl = `https://discord.com/api/v9/guilds/${GUILD_ID}/messages/search?author_id=${userToFetch}`;

		// const headers = {
		// 	authorization: `${DISCORD_TOKEN}`,
		// };

		// console.log(`Scraping messages for user ${userToFetch}`);

		// const response = (await axios.get(baseUrl, { headers })) as {
		// 	data: MessageSearchResponse;
		// };

		// const results = response.data;

		// await writeMessagesToDb({ results, user: userToFetch });

		// console.log(
		// 	`Scraped messages for user ${userToFetch} | Time taken: ${(new Date().getTime() - time_start) / 1000}s`
		// );

		// await sleep({ min: 5, max: 10 });

		// await scrapeMessages();
	} catch (err) {
		console.error(err);
	}
};

const findManyUsers = async (): Promise<void> => {
	// run findAUser 10 times
	for await (const _ of Array(10)) {
		await getAUser();
	}
};

export default scrapeMessages;
