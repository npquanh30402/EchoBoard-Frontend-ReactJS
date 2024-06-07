import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { ADD_NOTIFICATION } from "../store/notificationSlice.ts";
import { useAppDispatch } from "./hooks.ts";

type MessageType = {
  notification: {
    type: string;
    content: string;
    metadata?: {
      from?: string | undefined;
      related_id?: string | undefined;
      additional_info?: object | null;
    };
    receiverId: string;
  };
};

export const useNotificationWebSocket = () => {
  const dispatch = useAppDispatch();
  const { sendJsonMessage, lastJsonMessage } = useCentralWebSocket();

  const sendNotification = (message: MessageType) => {
    sendJsonMessage({
      action: "message",
      type: "notification",
      ...message,
    });
  };

  const handleIncomingNotification = useCallback(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as MessageType;

      if (msg.notification) dispatch(ADD_NOTIFICATION(msg.notification));
    }
  }, [dispatch, lastJsonMessage]);

  return {
    sendNotification,
    handleIncomingNotification,
  };
};
