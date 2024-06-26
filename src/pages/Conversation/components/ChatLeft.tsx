import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { MessageInterface } from "../../../interfaces";
import { formatDateForChat } from "../../../utils";

export const ChatLeft = ({ message }: { message: MessageInterface }) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + message.sender.avatarUrl;
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-14 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.sender.avatarUrl ? profileImage : avatarBackup}
            />
          </div>
        </div>
        <div className="chat-header gap-2 flex items-center">
          <span className={"font-bold text-xl"}>{message.sender.username}</span>
          <time className="text-xs opacity-50">
            {formatDateForChat(String(message.createdAt))}
          </time>
        </div>
        <div className="chat-bubble">{message.messageContent}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};
