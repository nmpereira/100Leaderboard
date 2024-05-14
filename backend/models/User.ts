import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	disc_id: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	to_scrape: {
		type: Boolean,
		default: false,
	},
	messages_last_scraped_at: {
		type: Date,
		default: null,
	},
	total_message_count: {
		type: Number,
		default: null,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", UserSchema);

export default User;
