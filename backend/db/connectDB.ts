import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env as { MONGO_URI: string };

const connectDB = async (): Promise<void> => {
	try {
		// mongoose setup
		const conn = await mongoose.connect(MONGO_URI, {
			dbName: "100Leaderboard",
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
