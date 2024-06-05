import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useCustomWebsocket,
} from "../../../hooks";
import { sanitizeAndTrimString } from "../../../utils";
import { ChatLeft } from "./ChatLeft.tsx";
import { ChatRight } from "./ChatRight.tsx";
import { ADD_MESSAGE } from "../../../store/conversationSlice.ts";
import { WebsocketMessageInterface } from "../../../interfaces";

export const ChatItem = () => {
  const { user, profile } = useAppSelector((state) => state.auth);
  const { activeUser, messages } = useAppSelector(
    (state) => state.conversation,
  );
  const userMessages = messages[activeUser?.id as string];

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { sendJsonMessage, lastJsonMessage } = useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/conversation/central-conversation",
    "Central Conversation",
  );

  const handleClickSendMessage = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.message.length > 0) {
      sendJsonMessage({
        receiverId: activeUser?.id,
        content: {
          id: user!.id,
          username: user!.username,
          fullName: profile?.fullName || "",
          profilePictureUrl: profile?.profilePictureUrl || "",
          message: sanitizeAndTrimString(formData.message),
        },
      });

      setFormData({
        message: "",
      });
    }
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const msgValue = lastJsonMessage as WebsocketMessageInterface;

      dispatch(
        ADD_MESSAGE({
          userId: activeUser?.id,
          message: msgValue.data.content,
          sentByCurrentUser: true,
        }),
      );
    }
  }, [lastJsonMessage]);

  return (
    <div className={"my-4 w-full px-4 md:px-12 flex flex-col justify-between"}>
      <div className={"overflow-auto h-[40rem]"}>
        {userMessages &&
          userMessages.map((message, idx) => {
            if (message.id === user?.id) {
              return <ChatLeft message={message} key={idx} />;
            } else {
              return <ChatRight message={message} key={idx} />;
            }
          })}
      </div>
      <form
        className={"flex flex-col gap-2 mt-"}
        onSubmit={handleClickSendMessage}
      >
        <label className={"font-bold"}>Enter your message:</label>
        <div className={"flex gap-2 h-full"}>
          <input
            className="input input-bordered w-full h-full"
            name={"message"}
            value={formData.message}
            onChange={handleChange}
          ></input>
          <button type={"submit"} className={"btn btn-primary h-full"}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
