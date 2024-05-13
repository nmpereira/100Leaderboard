import dotenv from "dotenv";
import scrapeUsersCron from "./cron/scrapeUsersCron";
import connectDB from "./db/connectDB";

dotenv.config();

connectDB();

if (process.env.SCRAPE_USERS === "true") {
	setTimeout(() => {
		console.log("Starting scraping users...");
		scrapeUsersCron();

		// wait for 10 mins
	}, 1000);
}
