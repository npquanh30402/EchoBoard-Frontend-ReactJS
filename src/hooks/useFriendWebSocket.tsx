import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { useAppDispatch } from "./hooks.ts";
import {
  ADD_FRIEND,
  ADD_FRIEND_FROM_SEND,
  REMOVE_FRIEND,
} from "../store/friendSlice.ts";
import { FriendInterface } from "../interfaces";
import { FriendEnum } from "../enums";

type MessageType = {
  friend: {
    type: string;
    user: FriendInterface;
    receiverId: string;
  };
};

export const useFriendWebSocket = () => {
  const dispatch = useAppDispatch();
  const { sendJsonMessage, lastJsonMessage } = useCentralWebSocket();

  const sendFriendNotice = (message: MessageType) => {
    sendJsonMessage({
      action: "message",
      type: "friend",
      ...message,
    });
  };

  const handleIncomingFriendNotice = useCallback(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as MessageType;

      if (msg.friend && msg.friend.type === "send") {
        dispatch(ADD_FRIEND_FROM_SEND(msg.friend.user));
      }

      if (msg.friend && msg.friend.type === "accepted") {
        dispatch(ADD_FRIEND(msg.friend.user));
      }

      if (msg.friend && msg.friend.type === "deleted") {
        dispatch(
          REMOVE_FRIEND({
            removedFriend: msg.friend.user,
            listName: FriendEnum.FriendRequestList,
          }),
        );
      }
    }
  }, [dispatch, lastJsonMessage]);

  return {
    sendFriendNotice,
    handleIncomingFriendNotice,
  };
};
