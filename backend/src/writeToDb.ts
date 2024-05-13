import User from "../models/User";
import { UserResponse } from "../types/UserTypes";

interface WriteUsersToDbResponse {
	success: boolean;
	message: string;
}

const writeUsersToDb = async (
	users: UserResponse[]
): Promise<WriteUsersToDbResponse> => {
	try {
		if (users.length === 0) {
			return {
				success: false,
				message: "No users to write to the database.",
			};
		}

		const bulkOperations = users.map((user) => ({
			updateOne: {
				filter: { disc_id: user.id },
				update: {
					$set: {
						username: user.username,
						avatar: user.avatar,
					},
				},
				upsert: true,
			},
		}));

		const insertedUsers = await User.bulkWrite(bulkOperations);

		if (insertedUsers instanceof Error) {
			return {
				success: false,
				message: "Error saving users to the database.",
			};
		}

		return {
			success: true,
			message: "Users written to the database.",
		};
	} catch (err) {
		console.error({ err });
		return {
			success: false,
			message: "Error writing users to the database.",
		};
	}
};

export default writeUsersToDb;
