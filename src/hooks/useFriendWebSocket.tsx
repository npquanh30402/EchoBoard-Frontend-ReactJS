import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { FriendInterface } from "../interfaces";
import { useAppDispatch } from "./hooks.ts";
import { ADD_FRIEND, REMOVE_FRIEND } from "../store/friendSlice.ts";
import { FriendEnum } from "../enums";

export const useFriendWebSocket = () => {
  const dispatch = useAppDispatch();

  const filter = (msg: MessageEvent<FriendInterface>) => {
    const msgObject = JSON.parse(
      msg.data as unknown as string,
    ) as FriendInterface;

    return !!(msgObject && msgObject.friendId);
  };

  const { lastJsonMessage } = useCentralWebSocket(filter);

  const handleIncomingFriendNotice = useCallback(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as FriendInterface;

      if (msg.friendStatus === "pending") {
        dispatch(
          ADD_FRIEND({
            newFriend: msg,
            listName: FriendEnum.FriendRequestList,
          }),
        );
      }

      if (msg.friendStatus === "accepted") {
        dispatch(
          ADD_FRIEND({
            newFriend: msg,
            listName: FriendEnum.AcceptedFriends,
          }),
        );

        dispatch(
          REMOVE_FRIEND({
            removedFriend: msg,
            listName: FriendEnum.RequestSentList,
          }),
        );
      }

      if (msg.friendStatus === "rejected") {
        dispatch(
          REMOVE_FRIEND({
            removedFriend: msg,
            listName: FriendEnum.FriendRequestList,
          }),
        );
      }

      if (msg.friendStatus === "deleted") {
        dispatch(
          REMOVE_FRIEND({
            removedFriend: msg,
            listName: FriendEnum.FriendRequestList,
          }),
        );
      }
    }
  }, [lastJsonMessage]);

  return {
    handleIncomingFriendNotice,
  };
};
