import {
  useConversationMessageWebSocket,
  useNotificationWebSocket,
} from "../../hooks";
import { useFriendWebSocket } from "../../hooks/useFriendWebSocket.tsx";
import { useEffect } from "react";

export const WebSocketInitialization = () => {
  const { handleIncomingNotification } = useNotificationWebSocket();

  const { handleIncomingFriendNotice } = useFriendWebSocket();

  const { handleIncomingConversationMessage } =
    useConversationMessageWebSocket();

  useEffect(() => {
    handleIncomingNotification();
  }, [handleIncomingNotification]);

  useEffect(() => {
    handleIncomingFriendNotice();
  }, [handleIncomingFriendNotice]);

  useEffect(() => {
    handleIncomingConversationMessage();
  }, [handleIncomingConversationMessage]);

  return null;
};
