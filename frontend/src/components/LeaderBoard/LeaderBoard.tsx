import { useEffect, useState } from "react";
import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { LeaderBoardTable } from "../LeaderBoardTable/LeaderBoardTable";
import { LeaderBoardBar } from "../LeaderBoardBar/LeaderBoardBar";

const LeaderBoard = () => {
  const [users, setUsers] = useState<UserReturn[]>([]);
  const leardBoardCutOff = 5;

  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/top?limit=999`
    );
    const data = await response.json();
    if (data.users) {
      setUsers(data.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Top 5 users */}
        {users.length > 0 ? (
          <LeaderBoardBar users={users.slice(0, leardBoardCutOff)} />
        ) : (
          <p>loading....</p>
        )}

        {/* Rest of the users */}
        <LeaderBoardTable users={users} leardBoardCutOff={leardBoardCutOff} />
      </div>
    </>
  );
};

export default LeaderBoard;
