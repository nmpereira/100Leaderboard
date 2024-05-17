import User from "../models/User";
import { UserReturn } from "../types/UserTypes";

const removeExtraFieldsFromUser = (
	user: InstanceType<typeof User>
): UserReturn => {
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
