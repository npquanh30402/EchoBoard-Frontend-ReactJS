import { UserSearchType } from "./SearchModal.tsx";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export const UserSearchItem = ({
  user,
  setShowModal,
}: {
  user: UserSearchType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const profileImage = import.meta.env.VITE_SERVER_URL + "/" + user.avatarUrl;

  return (
    <>
      <div className="card card-compact w-full bg-base-100 border border-black dark:border-white">
        <div className="card-body flex flex-row justify-between items-center">
          <div className={"flex flex-row gap-4 justify-center items-center"}>
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img
                  src={user.avatarUrl ? profileImage : avatarBackup}
                  alt={`${user.username}'s avatar`}
                />
              </div>
            </div>
            <div>
              <h2 className="card-title">{user.username}</h2>
              {user.username && (
                <p className={"text-sm text-slate-500"}>{user.fullName}</p>
              )}
            </div>
          </div>
          <div>
            <Link
              to={`/profile/${user.userId}`}
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
