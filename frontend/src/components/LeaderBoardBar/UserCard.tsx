import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { UserImage } from "../UserImage/UserImage";

interface UserCardProps {
  user: UserReturn;
  rank: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
  return (
    <div className="card card-side bg-base-100 glass p-3 m-2">
      <div className="flex items-center gap-3">
        <UserImage user={user} size={48} />
      </div>
      <div className="card-body">
        <h2 className="card-title">
          # {rank} {user.username} ({user.total_message_count || "N/A"})
        </h2>
      </div>
    </div>
  );
};

export { UserCard };
