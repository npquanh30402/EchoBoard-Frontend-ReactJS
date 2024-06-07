import { useDocumentTitle } from "../../hooks";
import { ConversationSidebar } from "./components/ConversationSidebar.tsx";
import { ChatItem } from "./components/ChatItem.tsx";

export const ConversationPage = () => {
  useDocumentTitle("Conversation");

  return (
    <section id={"conversation"}>
      <div className={"mx-auto rounded-xl flex"}>
        <ConversationSidebar />
        <ChatItem />
      </div>
    </section>
  );
};
