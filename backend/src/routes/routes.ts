import express from "express";
import User from "../models/User";
import removeExtraFieldsFromUser from "../helpers/removeExtraFieldsFromUser";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Welcome to the 100Leaderboard API" });
});

router.get("/top", async (req, res) => {
	const { limit } = req.query;

	if (!limit || Number.isNaN(Number(limit))) {
		return res.status(400).json({
			message:
				"Please provide a limit for the number of users to return like &limit=10",
		});
	}

	if (Number(limit) > 1000) {
		return res.status(400).json({
			message: "Limit cannot be greater than 1000",
		});
	}

	const topUsers = await User.find({})
		.sort({ total_message_count: -1 })
		.limit(Number(limit));

	const usersWithoutExtraFields = topUsers.map((user) =>
		removeExtraFieldsFromUser(user)
	);

	return res.json({ count: topUsers.length, users: usersWithoutExtraFields });
});

router.get("/user/:disc_id", async (req, res) => {
	const { disc_id } = req.params;

	const user = await User.findOne({ disc_id });

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.json(removeExtraFieldsFromUser(user));
});

router.post("/track/:disc_id", async (req, res) => {
	const { disc_id } = req.params;

	// if user.to_scrape is "never", then don't update to_scrape to true, otherwise update to true
	const user = await User.findOneAndUpdate(
		{ disc_id },
		{
			$set: { to_scrape: { $ne: "never" } },
		},
		{ new: true }
	);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	if (user.to_scrape === "never") {
		return res.json({
			message: `User ${disc_id} (${user.username}) is set to never track.`,
			user: removeExtraFieldsFromUser(user),
		});
	}

	return res.json({
		message: `Tracking user ${disc_id} (${user.username})`,
		user: removeExtraFieldsFromUser(user),
	});
});

router.post("/untrack/:disc_id", async (req, res) => {
	const { disc_id } = req.params;

	const user = await User.findOneAndUpdate(
		{ disc_id },
		{
			$set: { to_scrape: "never" },
		},
		{ new: true }
	);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.json({
		message: `User ${disc_id} (${user.username}) is set to never track.`,
		user: removeExtraFieldsFromUser(user),
	});
});

export default router;
