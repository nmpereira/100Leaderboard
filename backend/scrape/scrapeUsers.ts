import axios from "axios";
import dotenv from "dotenv";
import { UserResponse } from "../types/UserTypes";
import writeUsersToDb from "../src/writeToDb";

import sleep from "../helpers/sleep";
import User from "../models/User";

dotenv.config();

const { DISCORD_TOKEN, CHANNEL_ID_RULES, MESSAGE_ID_RULES } = process.env;

const getLastUser = async (): Promise<string> => {
	const lastUser = await User.findOne().sort({ created_at: -1 });
	return lastUser?.disc_id || "0";
};

const scrapeUsersAfter = async (): Promise<void> => {
	try {
		const time_start = new Date().getTime();
		const lastUser = await getLastUser();
		const baseUrl = `https://discord.com/api/v9/channels/${CHANNEL_ID_RULES}/messages/${MESSAGE_ID_RULES}/reactions/%E2%9C%85?limit=100&type=0&after=${lastUser}`;
		const headers = {
			authorization: `${DISCORD_TOKEN}`,
		};
		console.log(`Scraping users after ${lastUser}`);
		const response = (await axios.get(baseUrl, { headers })) as {
			data: UserResponse[];
		};
		const users = response.data;

		await writeUsersToDb(users);

		console.log(
			`Scraped ${users.length} users ending at ${users[users.length - 1].id} | Time taken: ${
				(new Date().getTime() - time_start) / 1000
			}s`
		);

		if (users.length < 1) {
			console.log("Finished scraping users!");
		}

		await sleep({ min: 60, max: 100 });

		await scrapeUsersAfter();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
};

export default scrapeUsersAfter;
