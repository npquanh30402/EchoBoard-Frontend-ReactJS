import useWebSocket from "react-use-websocket";
import { useAppDispatch } from "../../../hooks";
import { ADD_MESSAGE } from "../../../store/conversationSlice.ts";
import { useEffect } from "react";
import { WebsocketMessageInterface } from "../../../interfaces";

export const UserPrivateConversationWebsocket = () => {
  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/conversation/user-private-conversation",
    {
      share: true,
      onOpen: () => console.log(`User Private Conversation, opened`),
      onClose: () => console.log(`User Private Conversation, close`),
      shouldReconnect: () => true,
      retryOnError: true,
    },
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
  }, [lastJsonMessage]);

  return null;
};
