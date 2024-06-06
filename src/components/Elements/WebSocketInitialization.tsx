import {
  useCentralNotificationWebSocket,
  usePrivateConversationWebSocket,
  usePrivateNotificationWebSocket,
} from "../../hooks";

export const WebSocketInitialization = () => {
  useCentralNotificationWebSocket();
  usePrivateConversationWebSocket();
  usePrivateNotificationWebSocket();

  return null;
};
