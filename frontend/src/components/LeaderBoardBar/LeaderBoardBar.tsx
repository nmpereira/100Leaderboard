import { UserReturn } from "../../../../backend/src/types/UserTypes";

import { UserCard } from "./UserCard";

type LeaderBoardBarProps = {
  users: UserReturn[];
};
export const LeaderBoardBar = ({ users }: LeaderBoardBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center max-w-4xl gap-4 mb-8 max-h-96 mt-16">
      {users.map((user, index) => (
        <UserCard user={user} rank={index + 1} key={user.disc_id} />
      ))}
    </div>
  );
};
