import { useEffect, useState } from "react";
import { fetchConversationListService } from "../../../services";
import { ConversationInterface } from "../../../interfaces";
import { ConversationItem } from "./ConversationItem.tsx";

export const ConversationSidebar = () => {
  const [conversationList, setConversationList] = useState<
    ConversationInterface[]
  >([]);

  async function fetchConversations() {
    const response = await fetchConversationListService();

    if (response) {
      setConversationList(response);
    }
  }

  useEffect(() => {
    fetchConversations().then();
  }, []);

  return (
    <div>
      <div className="drawer lg:drawer-open z-10">
        <input id="friend-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center fixed top-[200px] opacity-60">
          <label
            htmlFor="friend-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <i className="bi bi-people-fill"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="friend-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2">
            {conversationList &&
              conversationList.map((convo) => (
                <li key={convo.conversationId}>
                  <ConversationItem convo={convo} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
