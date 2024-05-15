import User from "../models/User";

const removeExtraFieldsFromUser = (
	user: InstanceType<typeof User>
): {
	disc_id: string;
	username: string;
	avatar: string;
	total_message_count: number;
	created_at: Date;
} => {
	// remove fields that we don't want to expose like _id, __v, to_scrape

	return {
		disc_id: user.disc_id,
		username: user.username,
		avatar: user.avatar,
		total_message_count: user.total_message_count,
		created_at: user.created_at,
	};
};

export default removeExtraFieldsFromUser;
