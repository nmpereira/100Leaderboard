import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { UserImage } from "../UserImage/UserImage";

type LeaderBoardBarProps = {
  users: UserReturn[];
};
export const LeaderBoardBar = ({ users }: LeaderBoardBarProps) => {
  return (
    <>
      {users.map((user) => (
        // <StyledLeaderBoardBar key={user.disc_id}>
        <div key={user.disc_id} className="flex items-center">
          <UserImage user={user} />
          <p>
            {user.username} ({user.total_message_count || "N/A"})
          </p>
        </div>
      ))}
    </>
  );
};
