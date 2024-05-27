import { UserReturn } from "../../../../backend/src/types/UserTypes";

type LeaderBoardTableProps = {
  users: UserReturn[];
  leardBoardCutOff: number;
};

const LeaderBoardTable = ({
  users,
  leardBoardCutOff,
}: LeaderBoardTableProps) => {
  return users.length > 0 ? (
    <table>
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
            <td>{user.username}</td>
            <td>{user.total_message_count ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No users found</p>
  );
};

export { LeaderBoardTable };
