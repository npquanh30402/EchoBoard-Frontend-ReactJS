import { FriendInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { Link } from "react-router-dom";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../../store/friendSlice.ts";
import {
  useAppDispatch,
  useAppSelector,
  useCentralNotificationWebSocket,
} from "../../../hooks";
import {
  acceptFriendRequestService,
  deleteRequestSentService,
} from "../../../services";
import { toast } from "react-toastify";
import { FriendEnum } from "../../../enums";

export const FriendItem = ({
  friend,
  type,
}: {
  friend: FriendInterface;
  type: string;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + friend?.profilePictureUrl;
  const dispatch = useAppDispatch();

  const { sendNotification } = useCentralNotificationWebSocket();

  async function handleAccept() {
    const response = await acceptFriendRequestService(friend.id);

    if (response) {
      toast.success("Friend request accepted!");
      dispatch(ADD_FRIEND(friend));

      sendNotification(
        {
          type: "friend_request",
          content: `User ${user?.username} has accepted your friend request`,
          metadata: {
            from: user?.username,
            related_id: user?.id,
          },
        },
        friend.id,
      );
    }
  }

  async function handleDelete() {
    const response = await deleteRequestSentService(friend.id);

    if (response) {
      toast.success("Your request has been deleted!");
      dispatch(
        REMOVE_FRIEND({
          removedFriend: friend,
          listName: FriendEnum.RequestSentList,
        }),
      );
    }
  }

  const renderButton = () => {
    switch (type) {
      case FriendEnum.FriendList:
        return;
      case FriendEnum.FriendRequestList:
        return (
          <>
            <button className="btn btn-success" onClick={handleAccept}>
              Accept
            </button>
            <button className="btn btn-error">Deny</button>
          </>
        );
      case FriendEnum.RequestSentList:
        return (
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        );
    }
  };

  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img
                src={friend.profilePictureUrl ? profileImage : avatarBackup}
                alt={""}
              />
            </div>
          </div>
          <h2 className="card-title">{friend.username}</h2>
          <p>{friend.fullName}</p>
          <div className="card-actions justify-end">
            <Link to={`/profile/${friend.id}`} className="btn btn-primary">
              Profile Page
            </Link>
            {renderButton()}
          </div>
        </div>
      </div>
    </>
  );
};
