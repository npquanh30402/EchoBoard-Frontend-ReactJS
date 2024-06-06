import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks.ts";
import { WebsocketMessageInterface } from "../interfaces";
import { ADD_MESSAGE } from "../store/conversationSlice.ts";

export const usePrivateConversationWebSocket = () => {
  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/conversation/user-private-conversation",
    {
      share: true,
      // onOpen: () => console.log(`${_type}, opened`),
      // onClose: () => console.log(`${_type}, close`),
      // onMessage: (msg) => console.log(JSON.parse(msg.data)),
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
  }, [dispatch, lastJsonMessage]);
};
