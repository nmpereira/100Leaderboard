import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/db/connectDB";
import routes from "./src/routes/routes";
import scrapeUsersCron from "./src/cron/scrapeUsersCron";
import scrapeMessages from "./src/scrape/scrapeMessages";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

connectDB();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	})
);

app.use("/api", routes);

app.get("/", (req, res) => {
	res.json({
		message: `100Leaderboard API is up and running as of: ${new Date().toLocaleString(
			"en-US",
			{
				timeZone: "America/New_York",
			}
		)}`,
	});
});

app.get("/ping", (req, res) => {
	res.json({
		message: "pong",
	});
});

const startServer = () => {
	return new Promise((resolve, reject) => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
			resolve(true);
		});

		app.on("error", (err) => {
			console.error(err);
			reject(err);
		});
	}).catch((err) => {
		console.error(err);
		throw new Error(err);
	});
};

if (process.env.NODE_ENV === "production") {
	startServer();
}

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

export default app;
