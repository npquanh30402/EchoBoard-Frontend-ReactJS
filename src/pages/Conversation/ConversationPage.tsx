import { useDocumentTitle } from "../../hooks";
import { FriendSidebar } from "./components/FriendSidebar.tsx";
import { ChatItem } from "./components/ChatItem.tsx";

export const ConversationPage = () => {
  useDocumentTitle("Conversation");

  return (
    <section id={"conversation"}>
      <div className={"mx-auto rounded-xl flex"}>
        <FriendSidebar />
        <ChatItem />
      </div>
    </section>
  );
};
