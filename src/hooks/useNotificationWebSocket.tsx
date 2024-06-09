import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { ADD_NOTIFICATION } from "../store/notificationSlice.ts";
import { useAppDispatch } from "./hooks.ts";
import { NotificationInterface } from "../interfaces";

export const useNotificationWebSocket = () => {
  const dispatch = useAppDispatch();

  const filter = (msg: MessageEvent<NotificationInterface>) => {
    const msgObject = JSON.parse(
      msg.data as unknown as string,
    ) as NotificationInterface;

    return !!(msgObject && msgObject.notificationId);
  };

  const { lastJsonMessage } = useCentralWebSocket(filter);

  const handleIncomingNotification = useCallback(() => {
    if (lastJsonMessage !== null) {
      dispatch(ADD_NOTIFICATION(lastJsonMessage));
    }
  }, [dispatch, lastJsonMessage]);

  return {
    handleIncomingNotification,
  };
};
