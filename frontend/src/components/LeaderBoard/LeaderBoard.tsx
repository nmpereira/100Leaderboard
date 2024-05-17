import { useEffect, useState } from "react";
import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { LeaderBoardTable } from "../LeaderBoardTable/LeaderBoardTable";
import { LeaderBoardBar } from "../LeaderBoardBar/LeaderBoardBar";
import { Center } from "./LeaderBoard.styled";

const LeaderBoard = () => {
  const [users, setUsers] = useState<UserReturn[]>([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/top?limit=999");
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
      <Center>
        {/* Top 5 users */}
        {users.length > 0 ? (
          <LeaderBoardBar users={users.slice(0, 5)} />
        ) : (
          <p>Quack....</p>
        )}

        {/* Rest of the users */}
        <LeaderBoardTable users={users.slice(5)} />
      </Center>
    </>
  );
};

export default LeaderBoard;
