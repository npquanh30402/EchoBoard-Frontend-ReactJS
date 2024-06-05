import { RouteEnum } from "../../enums";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";

export const ConversationHeader = () => {
  const { unread_counts } = useAppSelector((state) => state.conversation);
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);

  useEffect(() => {
    let totalUnreadCount = 0;
    for (const userId in unread_counts) {
      totalUnreadCount += unread_counts[userId];
    }

    setTotalUnreadCount(totalUnreadCount);
  }, [unread_counts]);

  return (
    <div>
      <Link to={RouteEnum.CONVERSATION} className="btn btn-ghost btn-circle">
        <div className={"indicator"}>
          <i className="bi bi-chat text-xl"></i>
          {totalUnreadCount > 0 && (
            <span className="badge badge-sm indicator-item bg-red-500 text-white">
              {totalUnreadCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};
