import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { MessageType } from "../GlobalChatPage.tsx";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export const ChatRight = ({ message }: { message: MessageType }) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + message.avatarUrl;

  const [msgDate, setMsgDate] = useState(
    formatDistanceToNow(new Date(message.createdAt), {
      addSuffix: true,
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const date = formatDistanceToNow(new Date(message.createdAt), {
        addSuffix: true,
      });
      setMsgDate(date);
    }, 10000);

    return () => clearInterval(interval);
  }, [message.createdAt]);

  return (
    <>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-14 rounded-full">
            <img alt="" src={message.avatarUrl ? profileImage : avatarBackup} />
          </div>
        </div>

        <div className="chat-header gap-2 flex items-center">
          <span className={"font-bold text-xl"}>{message.username}</span>
        </div>
        <div>
          <div className="chat-bubble">{message.message}</div>
          <time className="text-xs opacity-50">{msgDate}</time>
        </div>
      </div>
    </>
  );
};
