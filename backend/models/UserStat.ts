import mongoose from "mongoose";

const UserStatSchema = new mongoose.Schema({
	disc_id: {
		type: String,
		required: true,
		unique: true,
	},
	message_count: {
		type: Number,
		default: 0,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const UserStat = mongoose.model("User", UserStatSchema);

export default UserStat;
