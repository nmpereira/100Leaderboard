import { CronJob } from "cron";
import scrapeUsersAfter from "../scrape/scrapeUsers";

const scrapeUsersCron = async (): Promise<void> => {
	if (process.env.SCRAPE_USERS === "true") {
		await scrapeUsersAfter();

		const job = new CronJob(
			// run the cron job every 1 week
			"0 0 0 * * 0",
			async () => {
				await scrapeUsersAfter();
			}
		);
		job.start();
	}
};

export default scrapeUsersCron;
