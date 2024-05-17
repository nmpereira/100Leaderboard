import { UserReturn } from "../../../../backend/src/types/UserTypes";

const UserImage = ({ user }: { user: UserReturn }) => {
  return (
    <>
      {user.avatar ? (
        <img
          src={`
          https://cdn.discordapp.com/avatars/${user.disc_id}/${user.avatar}.webp?size=48
          `}
          alt={user.username}
        />
      ) : (
        <img
          src="/discordIcon.webp"
          alt={user.username}
          height="48"
          width="48"
        />
      )}
    </>
  );
};

export { UserImage };
