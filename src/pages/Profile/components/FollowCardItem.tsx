import { FollowInterface } from "../../../interfaces";
import { Link } from "react-router-dom";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";

export const FollowCardItem = ({ user }: { user: FollowInterface }) => {
  const avatar = import.meta.env.VITE_SERVER_URL + "/" + user.avatarUrl;
  return (
    <>
      <div className={"w-full border-b"}>
        <div className="card w-full">
          <div className="card-body flex-row justify-between items-center w-full">
            <div className={"flex gap-2 items-center"}>
              <div>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={user.avatarUrl ? avatar : avatarBackup}
                      alt={`${user.username}'s avatar`}
                    />
                  </div>
                </div>
              </div>
              <h3>{user.username}</h3>
            </div>
            <Link
              to={"/profile/" + user.userId}
              className="btn btn-primary btn-sm"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
