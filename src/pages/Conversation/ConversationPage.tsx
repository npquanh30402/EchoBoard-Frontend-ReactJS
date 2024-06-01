import { ChatLeft } from "./components/ChatLeft.tsx";
import { ChatRight } from "./components/ChatRight.tsx";
import { FriendSidebar } from "./components/FriendSidebar.tsx";
import { useDocumentTitle } from "../../hooks";
// import useWebSocket from "react-use-websocket";
// import { useEffect, useState } from "react";

export const ConversationPage = () => {
  useDocumentTitle("Conversation");

  // const [socketUrl, setSocketUrl] = useState("");
  // const [messages, setMessages] = useState<MessageEvent[]>([]);
  //
  // const { sendMessage, lastJsonMessage } = useWebSocket(socketUrl, {
  //   onOpen: () => console.log("opened"),
  //   onClose: () => console.log("closed"),
  // });
  //
  // useEffect(() => {
  //   if (lastJsonMessage !== null) {
  //     setMessages((prev) => prev.concat(lastJsonMessage));
  //
  //     console.log(lastJsonMessage);
  //   }
  // }, [lastJsonMessage]);
  //
  // const handleClickSendMessage = (evt) => {
  //   evt.preventDefault();
  //
  //   sendMessage(evt.target.messageInput.value);
  // };
  //
  // const handleClickChangeSocketUrl = async (evt) => {
  //   evt.preventDefault();
  //
  //   setSocketUrl(
  //     `ws://localhost:3000/ws/conversation/${evt.target.userId.value}`,
  //   );
  // };

  return (
    <section id={"conversation"}>
      <div className={"mx-auto rounded-xl flex"}>
        {/*<form onSubmit={handleClickChangeSocketUrl} className={"flex gap-2"}>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Enter user ID to chat"*/}
        {/*    name={"userId"}*/}
        {/*    className="input input-bordered w-full"*/}
        {/*  />*/}
        {/*  <button type={"submit"} className={"btn btn-primary"}>*/}
        {/*    Select*/}
        {/*  </button>*/}
        {/*</form>*/}

        {/*<form onSubmit={handleClickSendMessage} className={"flex gap-2"}>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Enter message"*/}
        {/*    name={"messageInput"}*/}
        {/*    className="input input-bordered w-full"*/}
        {/*  />*/}
        {/*  <button type={"submit"} className={"btn btn-primary"}>*/}
        {/*    Select*/}
        {/*  </button>*/}
        {/*</form>*/}

        {/*<ul>*/}
        {/*  {messages.map((message, idx) => (*/}
        {/*    <li key={idx}>*/}
        {/*      {message ? message.username : null}:{" "}*/}
        {/*      {message ? message.message : null}*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}

        <div>
          <FriendSidebar />
        </div>

        <div className={"my-4 w-full px-4 md:px-12"}>
          <ChatLeft />
          <ChatRight />
        </div>
      </div>
    </section>
  );
};
