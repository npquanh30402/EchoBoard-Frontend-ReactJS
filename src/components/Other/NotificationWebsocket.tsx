import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { SET_NOTIFICATIONS } from "../../store/notificationSlice.ts";

export const NotificationWebsocket = () => {
  const socketUrl = import.meta.env.VITE_WEBSOCKET_URL + `/ws/notifications`;
  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useWebSocket(socketUrl, {
    share: true,
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    shouldReconnect: () => true,
    retryOnError: true,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      dispatch(SET_NOTIFICATIONS(lastJsonMessage));
    }
  }, [dispatch, lastJsonMessage]);

  return <></>;
};
