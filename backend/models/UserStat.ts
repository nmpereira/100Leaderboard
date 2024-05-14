import mongoose from "mongoose";

const UserStatSchema = new mongoose.Schema({
	disc_id: {
		type: String,
		required: true,
		unique: true,
	},
	total_message_count: {
		type: Number,
		default: 0,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const UserStat = mongoose.model("UserStat", UserStatSchema);

export default UserStat;
