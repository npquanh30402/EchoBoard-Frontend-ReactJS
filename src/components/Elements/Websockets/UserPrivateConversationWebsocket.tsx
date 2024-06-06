import { useAppDispatch, useCustomWebsocket } from "../../../hooks";
import { ADD_MESSAGE } from "../../../store/conversationSlice.ts";
import { useEffect } from "react";
import { WebsocketMessageInterface } from "../../../interfaces";

export const UserPrivateConversationWebsocket = () => {
  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/conversation/user-private-conversation",
    "User Private Conversation",
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const msgValue = lastJsonMessage as WebsocketMessageInterface;

      dispatch(
        ADD_MESSAGE({
          userId: msgValue.data.senderId,
          message: msgValue.data.content,
          sentByCurrentUser: false,
        }),
      );
    }
  }, [dispatch, lastJsonMessage]);

  return null;
};
