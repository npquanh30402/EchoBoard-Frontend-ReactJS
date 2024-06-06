import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { ADD_NOTIFICATION } from "../store/notificationSlice.ts";
import { useAppDispatch } from "./hooks.ts";

export const usePrivateNotificationWebSocket = () => {
  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      `/api/notification/private-notification`,
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
      dispatch(ADD_NOTIFICATION(lastJsonMessage));
    }
  }, [dispatch, lastJsonMessage]);
};
