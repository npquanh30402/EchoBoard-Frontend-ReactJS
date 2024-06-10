import { useCentralWebSocket } from "./useCentralWebSocket.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { MessageInterface } from "../interfaces";
import { ADD_MESSAGE } from "../store/conversationSlice.ts";

export const useMessageWebSocket = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const filter = (msg: MessageEvent<MessageInterface>) => {
    const msgObject = JSON.parse(
      msg.data as unknown as string,
    ) as MessageInterface;

    return !!msgObject.messageId;
  };

  const { lastJsonMessage } = useCentralWebSocket(filter);

  const handleIncomingConversationMessage = useCallback(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as MessageInterface;
      dispatch(
        ADD_MESSAGE({
          conversationId: msg.conversationId,
          message: msg,
          sentByCurrentUser: user!.userId === msg.sender.userId,
        }),
      );
    }
  }, [dispatch, lastJsonMessage]);

  return {
    handleIncomingConversationMessage,
  };
};
