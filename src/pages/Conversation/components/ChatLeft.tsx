import avatarBackup from "/public/assets/images/avatar_backup.jpg";
import { ConversationInterface } from "../../../interfaces";

export const ChatLeft = ({ message }: { message: ConversationInterface }) => {
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + message.profilePictureUrl;
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.profilePictureUrl ? profileImage : avatarBackup}
            />
          </div>
        </div>
        <div className="chat-header">
          {message.username}
          <time className="text-xs opacity-50">{message.date}</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};
