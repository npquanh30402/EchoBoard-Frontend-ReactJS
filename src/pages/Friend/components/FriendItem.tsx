import { ConversationInterface, FriendInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../../store/friendSlice.ts";
import { useAppDispatch } from "../../../hooks";
import {
  acceptFriendRequestService,
  createConversationService,
  deleteRequestSentService,
  fetchAConversationService,
  rejectFriendRequestService,
} from "../../../services";
import { toast } from "react-toastify";
import { FriendEnum } from "../../../enums";
import { SET_ACTIVE_CONVERSATION } from "../../../store/conversationSlice.ts";

export const FriendItem = ({
  friend,
  type,
}: {
  friend: FriendInterface;
  type: string;
}) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + friend?.avatarUrl;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleAccept() {
    const response = await acceptFriendRequestService(friend.userId);

    if (response) {
      toast.success("Friend request accepted!");

      dispatch(
        REMOVE_FRIEND({
          listName: FriendEnum.FriendRequestList,
          removedFriend: friend,
        }),
      );

      dispatch(
        ADD_FRIEND({
          listName: FriendEnum.AcceptedFriends,
          newFriend: friend,
        }),
      );
    }
  }

  async function handleReject() {
    const response = await rejectFriendRequestService(friend.userId);

    if (response) {
      toast.success("Friend request accepted!");

      dispatch(
        REMOVE_FRIEND({
          listName: FriendEnum.FriendRequestList,
          removedFriend: friend,
        }),
      );
    }
  }

  async function handleDelete() {
    const response = await deleteRequestSentService(friend.userId);

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

  async function handleMessage() {
    const responseFetch = (await fetchAConversationService(
      friend.userId,
    )) as ConversationInterface;

    if (responseFetch.otherUser.userId) {
      navigate(`/conversation/${responseFetch.conversationId}`);
      dispatch(SET_ACTIVE_CONVERSATION(responseFetch));
      return;
    }

    const responseCreate = (await createConversationService(
      friend.userId as string,
    )) as ConversationInterface;

    if (responseCreate) {
      navigate(`/conversation/${responseCreate.conversationId}`);
      dispatch(SET_ACTIVE_CONVERSATION(responseCreate));
    }
  }

  const renderButton = () => {
    switch (type) {
      case FriendEnum.AcceptedFriends:
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
            <button className="btn btn-error" onClick={handleReject}>
              Deny
            </button>
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
      <div className="card w-96 border border-black dark:border-white">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img
                src={friend.avatarUrl ? profileImage : avatarBackup}
                alt={""}
              />
            </div>
          </div>
          <h2 className="card-title">{friend.username}</h2>
          <p>{friend.fullName}</p>
          <div className="card-actions justify-end">
            <Link to={`/profile/${friend.userId}`} className="btn btn-primary">
              Profile Page
            </Link>
            {renderButton()}
          </div>
        </div>
      </div>
    </>
  );
};
