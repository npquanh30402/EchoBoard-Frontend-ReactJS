import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { ConversationMessageInterface } from "../../../interfaces";
import { formatDateForChat } from "../../../utils";

export const ChatRight = ({
  message,
}: {
  message: ConversationMessageInterface;
}) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + message.sender.profilePictureUrl;
  return (
    <>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-14 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                message.sender.profilePictureUrl ? profileImage : avatarBackup
              }
            />
          </div>
        </div>
        <div className="chat-header flex gap-2 items-center">
          <time className="text-xs opacity-50">
            {formatDateForChat(String(message.createdAt))}
          </time>
          <span className={"font-bold text-xl"}>{message.sender.username}</span>
        </div>
        <div className="chat-bubble">{message.messageText}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};
