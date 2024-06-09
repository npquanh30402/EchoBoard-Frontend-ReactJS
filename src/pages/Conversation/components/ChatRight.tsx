import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { MessageInterface } from "../../../interfaces";
import { formatDateForChat } from "../../../utils";

export const ChatRight = ({ message }: { message: MessageInterface }) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + message.sender.avatarUrl;
  return (
    <>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-14 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.sender.avatarUrl ? profileImage : avatarBackup}
            />
          </div>
        </div>
        <div className="chat-header flex gap-2 items-center">
          <time className="text-xs opacity-50">
            {formatDateForChat(String(message.createdAt))}
          </time>
          <span className={"font-bold text-xl"}>{message.sender.username}</span>
        </div>
        <div className="chat-bubble">{message.messageContent}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};
