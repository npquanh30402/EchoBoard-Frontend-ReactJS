import { useCustomWebsocket } from "../../../hooks";

export const CentralConversationConWebsocket = () => {
  useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/conversation/central-conversation",
    "Central Conversation",
  );

  return null;
};
