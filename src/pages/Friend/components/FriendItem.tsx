import { FriendInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { Link } from "react-router-dom";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../../store/friendSlice.ts";
import {
  useAppDispatch,
  useAppSelector,
  useNotificationWebSocket,
} from "../../../hooks";
import {
  acceptFriendRequestService,
  createConversationService,
  deleteRequestSentService,
} from "../../../services";
import { toast } from "react-toastify";
import { FriendEnum } from "../../../enums";
import { useFriendWebSocket } from "../../../hooks/useFriendWebSocket.tsx";

export const FriendItem = ({
  friend,
  type,
}: {
  friend: FriendInterface;
  type: string;
}) => {
  const { user, profile } = useAppSelector((state) => state.auth);
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + friend?.profilePictureUrl;
  const dispatch = useAppDispatch();

  const { sendNotification } = useNotificationWebSocket();
  const { sendFriendNotice } = useFriendWebSocket();

  async function handleAccept() {
    const response = await acceptFriendRequestService(friend.id);

    if (response) {
      toast.success("Friend request accepted!");
      dispatch(ADD_FRIEND(friend));

      sendNotification({
        notification: {
          type: "friend_request",
          content: `User ${user?.username} has accepted your friend request`,
          metadata: {
            related_id: user?.id,
          },
          receiverId: friend?.id as string,
        },
      });

      sendFriendNotice({
        friend: {
          type: "accepted",
          user: {
            id: user!.id,
            fullName: profile?.fullName,
            username: user!.username,
            profilePictureUrl: profile?.profilePictureUrl,
            createdAt: new Date(),
          },
          receiverId: friend.id,
        },
      });
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

      sendFriendNotice({
        friend: {
          type: "deleted",
          user: {
            id: user!.id,
            fullName: profile?.fullName,
            username: user!.username,
            profilePictureUrl: profile?.profilePictureUrl,
            createdAt: new Date(),
          },
          receiverId: friend.id,
        },
      });
    }
  }

  async function handleMessage() {
    const formData = new FormData();

    formData.append("userId", friend.id);

    const response = await createConversationService(formData);

    if (response) {
      toast.success("You have created a new conversation!");
    }
  }

  const renderButton = () => {
    switch (type) {
      case FriendEnum.FriendList:
        return (
          <button className="btn btn-neutral" onClick={handleMessage}>
            Message
          </button>
        );
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
