import dotenv from "dotenv";
import scrapeUsersCron from "./cron/scrapeUsersCron";
import connectDB from "./db/connectDB";
import scrapeMessages from "./scrape/scrapeMessages";

dotenv.config();

connectDB();

if (process.env.SCRAPE_USERS === "true") {
	setTimeout(() => {
		console.log("Starting scraping users...");
		scrapeUsersCron();

		// wait for 10 mins
	}, 1000);
}

if (process.env.SCRAPE_MESSAGES === "true") {
	setTimeout(() => {
		console.log("Starting scraping messages...");
		scrapeMessages();
	}, 1000);
}
