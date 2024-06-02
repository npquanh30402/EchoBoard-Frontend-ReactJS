import { FriendInterface } from "../../../interfaces";
import avatarBackup from "/public/assets/images/avatar_backup.jpg";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SET_ACTIVE_USER } from "../../../store/conversationSlice.ts";
import { useEffect, useState } from "react";

export const FriendItem = ({ friend }: { friend: FriendInterface }) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + friend?.profilePictureUrl;

  const { activeUser } = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activeUser?.id === friend?.id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeUser?.id, friend?.id]);

  return (
    <>
      <div
        className={`card card-compact bg-base-100 border ${isActive ? "border-red-500" : ""}`}
        onClick={() => dispatch(SET_ACTIVE_USER(friend))}
      >
        <div className="card-body flex-row items-center justify-between">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={friend.profilePictureUrl ? profileImage : avatarBackup}
                alt={""}
              />
            </div>
          </div>
          <h2 className="card-title">{friend.username}</h2>
        </div>
      </div>
    </>
  );
};
