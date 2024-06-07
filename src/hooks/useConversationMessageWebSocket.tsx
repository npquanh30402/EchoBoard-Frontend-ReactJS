import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { ADD_MESSAGE } from "../store/conversationSlice.ts";

type MessageType = {
  conversation_message: {
    conversationId: string;
    messageText: string;
    fileId?: string;
    sender: {
      id: string;
      username: string;
      profilePictureUrl: string;
    };
    receiverId: string;
  };
};

export const useConversationMessageWebSocket = () => {
  const dispatch = useAppDispatch();
  const { sendJsonMessage, lastJsonMessage } = useCentralWebSocket();
  const { user } = useAppSelector((state) => state.auth);

  const sendMessage = (message: MessageType) => {
    sendJsonMessage({
      action: "message",
      type: "conversation-message",
      ...message,
    });
  };

  const handleIncomingConversationMessage = useCallback(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as MessageType;
      console.log(msg);
      if (msg.conversation_message) {
        dispatch(
          ADD_MESSAGE({
            conversationId: msg?.conversation_message.conversationId,
            message: msg?.conversation_message,
            sentByCurrentUser: user!.id === msg.conversation_message.sender.id,
          }),
        );
      }
    }
  }, [dispatch, lastJsonMessage]);

  return {
    sendMessage,
    handleIncomingConversationMessage,
  };
};
