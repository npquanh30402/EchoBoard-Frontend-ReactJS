import useWebSocket from "react-use-websocket";

export const useCentralWebSocket = () => {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL + "/ws",
    {
      share: true,
      onOpen: () => console.log(`Central WebSocket, opened!`),
      onClose: () => console.log(`Central WebSocket, close!`),
      // onMessage: (msg) => console.log(JSON.parse(msg.data)),
      shouldReconnect: () => true,
      retryOnError: true,
    },
  );

  return {
    lastJsonMessage,
    sendJsonMessage,
  };
};
