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
    <div className="w-9/12 max-w-5xl border-2 rounded-md border-gray-700">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Messages</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(leardBoardCutOff).map((user, index) => (
            <tr key={user.disc_id} className="hover">
              <th className="text-center">#{index + leardBoardCutOff + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <UserImage
                    user={user}
                    size={48}
                    rank={index + leardBoardCutOff + 1}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.total_message_count ?? 0}</td>
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
