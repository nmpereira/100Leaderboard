import { UserReturn } from "../../../../backend/src/types/UserTypes";
import { UserImage } from "../UserImage/UserImage";

interface UserCardProps {
  user: UserReturn;
  rank: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
  return (
    <div className={`${rank === 1 ? `w-full` : ``}`}>
      <div
        className={`card card-side bg-base-100 glass p-3 w-96 mx-auto ${rankColor(
          rank
        )}`}
      >
        <div className="flex items-center gap-3">
          <UserImage user={user} size={48} rank={rank} />
        </div>
        <div className="card-body">
          <h2 className="card-title">
            # {rank} {user.username} ({user.total_message_count || "N/A"})
          </h2>
        </div>
      </div>
    </div>
  );
};

const rankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-700";
    case 2:
      // return "bg-teal-700";
      return "bg-slate-700";
    case 3:
      return "bg-amber-800";
    case 4:
      return "bg-green-900";
    case 5:
      return "bg-blue-900";
    default:
      return "bg-base-300";
  }
};

export { UserCard };
