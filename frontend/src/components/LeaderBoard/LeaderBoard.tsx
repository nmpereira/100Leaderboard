import { useEffect, useState } from "react";
import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { LeaderBoardTable } from "../LeaderBoardTable/LeaderBoardTable";
import { LeaderBoardBar } from "../LeaderBoardBar/LeaderBoardBar";
import useWindowSize from "use-window-size-v2";

interface LeaderBoardProps {
  perPage: number;
}

const LeaderBoard = ({ perPage }: LeaderBoardProps) => {
  const { width } = useWindowSize();
  const [users, setUsers] = useState<UserReturn[]>([]);
  const [leardBoardCutOff, setLeardBoardCutOff] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/top?limit=${perPage}`
    );
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    const data = await response.json();
    if (data.users) {
      setUsers(data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [perPage]);

  useEffect(() => {
    if (width && width < 796) {
      setLeardBoardCutOff(3);
    } else {
      setLeardBoardCutOff(5);
    }
  }, [width]);
  return (
    <>
      <div className="flex flex-col items-center mb-auto">
        {/* Top 5 users */}
        {users.length > 0 ? (
          <LeaderBoardBar users={users.slice(0, leardBoardCutOff)} />
        ) : (
          <p>No users found</p>
        )}

        <div className="divider"></div>
        {/* Rest of the users */}
        <LeaderBoardTable users={users} leardBoardCutOff={leardBoardCutOff} />
        {loading && <span className="loading loading-dots loading-lg"></span>}
      </div>
    </>
  );
};

export default LeaderBoard;
