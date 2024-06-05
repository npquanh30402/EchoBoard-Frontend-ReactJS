import { useCustomWebsocket } from "../../../hooks";

export const CentralNotificationWebsocket = () => {
  useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/notification/central-notification",
    "Central Notification",
  );

  return null;
};
