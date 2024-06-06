import useWebSocket from "react-use-websocket";
import { QueryParams } from "react-use-websocket/dist/lib/types";

export const useCustomWebsocket = (
  url: string,
  _type: string,
  queryParams: QueryParams | undefined = undefined,
) => {
  return useWebSocket(url, {
    share: true,
    queryParams,
    // onOpen: () => console.log(`${_type}, opened`),
    // onClose: () => console.log(`${_type}, close`),
    // onMessage: (msg) => console.log(JSON.parse(msg.data)),
    shouldReconnect: () => true,
    retryOnError: true,
  });
};
