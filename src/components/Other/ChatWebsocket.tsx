import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { ADD_MESSAGE } from "../../store/conversationSlice.ts";
import { useAppDispatch } from "../../hooks";

export const ChatWebsocket = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const socketUrl =
    import.meta.env.VITE_WEBSOCKET_URL + `/ws/conversation/${id}`;

  const { lastJsonMessage } = useWebSocket(socketUrl, {
    share: true,
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      dispatch(
        ADD_MESSAGE({
          userId: id,
          message: lastJsonMessage,
        }),
      );
    }
  }, [dispatch, lastJsonMessage]);

  return <></>;
};
