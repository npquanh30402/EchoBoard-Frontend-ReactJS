import { useMessageWebSocket, useNotificationWebSocket } from "../../hooks";
import { useEffect } from "react";
import { useFriendWebSocket } from "../../hooks/useFriendWebSocket.tsx";

export const WebSocketInitialization = () => {
  const { handleIncomingNotification } = useNotificationWebSocket();

  const { handleIncomingFriendNotice } = useFriendWebSocket();

  const { handleIncomingConversationMessage } = useMessageWebSocket();

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
