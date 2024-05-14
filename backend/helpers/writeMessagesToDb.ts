import User from "../models/User";
import UserStat from "../models/UserStat";
import { MessageSearchResponse } from "../types/UserTypes";

interface WriteMessagesToDbResponse {
	success: boolean;
	message: string;
}

const writeUsersToDb = async ({
	results,
	user,
}: {
	results: MessageSearchResponse;
	user: string;
}): Promise<WriteMessagesToDbResponse> => {
	try {
		if (!results || !user) {
			console.error(
				`No results or user provided to write to the database.`
			);
			return {
				success: false,
				message: "No messages to write to the database.",
			};
		}

		// update UserStat with total_results
		const userStat = await UserStat.updateOne(
			{ disc_id: user },
			{ messages_total: results.total_results },
			{ upsert: true }
		);

		if (userStat instanceof Error) {
			console.error({ userStat });
			return {
				success: false,
				message: "Error saving user stats to the database.",
			};
		}

		// update User with messages_last_scraped_at
		const userUpdate = await User.updateOne(
			{ disc_id: user },
			{ messages_last_scraped_at: new Date() }
		);

		if (userUpdate instanceof Error) {
			console.error({ userUpdate });
			return {
				success: false,
				message: "Error saving user messages to the database.",
			};
		}

		return {
			success: true,
			message: "Messages written to the database.",
		};
	} catch (err) {
		console.error({ err });
		return {
			success: false,
			message: "Error writing messages to the database.",
		};
	}
};

export default writeUsersToDb;
