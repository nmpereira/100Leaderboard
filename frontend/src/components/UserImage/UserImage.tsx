import { UserReturn } from "../../../../backend/src/types/UserTypes";

interface UserImageProps {
  user: UserReturn;
  size: number;
  rank: number;
}

const UserImage = ({ user, size = 48, rank }: UserImageProps) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.currentTarget as HTMLImageElement;
    target.onerror = null; // Prevents looping in case the fallback image also fails to load
    target.src = "/discordIcon.webp";
  };
  return (
    <>
      <div className="avatar flex flex-col items-center">
        {rank === 1 && (
          <span role="img" aria-label="crown">
            👑
          </span>
        )}
        <div className="mask mask-squircle w-12 h-12 mx-2">
          {user.avatar ? (
            <img
              src={`
            https://cdn.discordapp.com/avatars/${user.disc_id}/${user.avatar}.webp?size=${size}
            `}
              alt={user.username}
              onError={handleError}
            />
          ) : (
            <img
              src="/discordIcon.webp"
              alt={user.username}
              height={size}
              width={size}
            />
          )}
        </div>
      </div>
    </>
  );
};

export { UserImage };

//  <div className="avatar">
//               <div className="mask mask-squircle w-12 h-12">
//                 <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
//               </div>
//             </div>
