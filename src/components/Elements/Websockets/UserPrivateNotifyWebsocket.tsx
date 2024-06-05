import { useCustomWebsocket } from "../../../hooks";

export const UserPrivateNotifyWebsocket = () => {
  useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL + "/api/ws/user-private-notify",
    "User Private Notify",
  );

  return null;
};
