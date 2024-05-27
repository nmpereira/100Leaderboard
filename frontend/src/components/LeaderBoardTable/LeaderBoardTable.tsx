import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { UserImage } from "../UserImage/UserImage";

type LeaderBoardTableProps = {
  users: UserReturn[];
  leardBoardCutOff: number;
};

const LeaderBoardTable = ({
  users,
  leardBoardCutOff,
}: LeaderBoardTableProps) => {
  return users.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Messages</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(leardBoardCutOff).map((user, index) => (
            <tr key={user.disc_id}>
              <td>{index + leardBoardCutOff + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <UserImage user={user} size={48} />
                  {user.username}
                </div>
              </td>
              <td>{user.total_message_count ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No users found</p>
  );
};

export { LeaderBoardTable };
