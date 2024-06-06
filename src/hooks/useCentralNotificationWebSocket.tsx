import useWebSocket from "react-use-websocket";
import { NotificationInterface } from "../interfaces";

export const useCentralNotificationWebSocket = () => {
  const { sendJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/notification/central-notification",
    {
      share: true,
      // onOpen: () => console.log(`${_type}, opened`),
      // onClose: () => console.log(`${_type}, close`),
      // onMessage: (msg) => console.log(JSON.parse(msg.data)),
      shouldReconnect: () => true,
      retryOnError: true,
    },
  );

  const sendNotification = (
    message: NotificationInterface,
    receiverId: string,
  ) => {
    sendJsonMessage({
      ...message,
      receiverId,
    });
  };

  return {
    sendNotification,
  };
};
