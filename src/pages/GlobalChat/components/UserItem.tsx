import { UserType } from "../GlobalChatPage.tsx";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { Link } from "react-router-dom";

export const UserItem = ({ user }: { user: UserType }) => {
  const profileImage = import.meta.env.VITE_SERVER_URL + "/" + user.avatarUrl;

  return (
    <>
      <Link
        to={"/profile/" + user.userId}
        className={"flex justify-between gap-2 items-center"}
      >
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img alt="" src={user.avatarUrl ? profileImage : avatarBackup} />
          </div>
        </div>
        <span>{user.username}</span>
      </Link>
    </>
  );
};
