import { useDocumentTitle } from "../../hooks";
import { ConversationSidebar } from "./components/ConversationSidebar.tsx";
import { Outlet } from "react-router-dom";

export const ConversationPage = () => {
  useDocumentTitle("Conversation");

  return (
    <section id={"conversation"}>
      <div className={"mx-auto rounded-xl flex"}>
        <ConversationSidebar />
        <Outlet />
      </div>
    </section>
  );
};
