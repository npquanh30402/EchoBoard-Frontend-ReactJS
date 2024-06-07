import { ConversationInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  DECREASE_UNREAD_COUNT,
  SET_ACTIVE_CONVERSATION,
} from "../../../store/conversationSlice.ts";
import { useEffect, useState } from "react";

export const ConversationItem = ({
  convo,
}: {
  convo: ConversationInterface;
}) => {
  const { unread_counts } = useAppSelector((state) => state.conversation);
  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + convo?.otherUser.profilePictureUrl;

  const { activeConversation } = useAppSelector((state) => state.conversation);

  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activeConversation?.conversationId === convo?.conversationId) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeConversation?.conversationId, convo?.conversationId]);

  function handleRequestChat() {
    dispatch(SET_ACTIVE_CONVERSATION(convo));
    dispatch(DECREASE_UNREAD_COUNT(convo.conversationId));
  }

  return (
    <>
      <div
        className={`card card-compact bg-base-100 border ${isActive ? "border-red-500" : ""}`}
        onClick={handleRequestChat}
      >
        <div className="card-body flex-row items-center justify-between">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={
                  convo.otherUser.profilePictureUrl
                    ? profileImage
                    : avatarBackup
                }
                alt={""}
              />
            </div>
          </div>
          <div className="card-title">
            <span>{convo.otherUser.username}</span>
            {unread_counts[convo.conversationId] > 0 && (
              <div className="badge badge-primary">
                {unread_counts[convo.conversationId]}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
