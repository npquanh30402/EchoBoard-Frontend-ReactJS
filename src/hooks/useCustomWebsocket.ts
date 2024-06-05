import useWebSocket from "react-use-websocket";
import { QueryParams } from "react-use-websocket/dist/lib/types";

export function useCustomWebsocket(
  url: string,
  queryParams: QueryParams | undefined = undefined,
) {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(url, {
    share: true,
    queryParams,
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    onMessage: () => console.log("message"),
    shouldReconnect: () => true,
    retryOnError: true,
  });

  return { sendJsonMessage, lastJsonMessage };
}
