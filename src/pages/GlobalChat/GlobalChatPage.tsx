import useWebSocket from "react-use-websocket";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sanitizeAndTrimString } from "../../utils";
import { useAppSelector } from "../../hooks";
import { ChatLeft } from "./components/ChatLeft.tsx";
import { ChatRight } from "./components/ChatRight.tsx";
import { UserItem } from "./components/UserItem.tsx";
import { UploadImageService } from "../../services";

export type MessageType = {
  userId: string;
  username: string;
  avatarUrl: string;
  message: string;
  file: string;
  createdAt: Date;
};

export type UserType = {
  userId: string;
  username: string;
  avatarUrl: string;
};

export type WebsocketMessageType = {
  type: string;
  data: never;
};

export const GlobalChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [userList, setUserList] = useState<UserType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [formData, setFormData] = useState({
    message: "",
    imageFile: null,
  });

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET_URL + "/ws/global-chat",
    {
      shouldReconnect: () => true,
      retryOnError: true,
    },
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const msg = lastJsonMessage as WebsocketMessageType;

      if (msg.type === "USERS_ADD") {
        setUserList((prev) => prev.concat(msg.data));
      }

      if (msg.type === "USERS_SET") {
        setUserList(msg.data);
      }

      if (msg.type === "USER_REMOVE") {
        const user = msg.data as UserType;

        setUserList((prev) => prev.filter((u) => u.userId !== user.userId));
      }

      if (msg.type === "MESSAGES_SET") {
        setMessages(msg.data);
      }

      if (msg.type === "MESSAGE_ADD") {
        setMessages((prev) => prev.concat(msg.data));
      }
    }
  }, [lastJsonMessage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = event.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files?.[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClickSendMessage = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.message.trim().length > 0 || formData.imageFile !== null) {
      let filePath = null;

      if (formData.imageFile) {
        const formDataObject = new FormData();
        formDataObject.append("imageFile", formData.imageFile);
        const response = await UploadImageService(formDataObject);

        if (response) {
          filePath = response;
        }
      }

      sendJsonMessage({
        message: sanitizeAndTrimString(formData.message),
        file: filePath,
      });

      setFormData({
        message: "",
        imageFile: null,
      });
    }
  };

  return (
    <section id={"global-chat"}>
      <div className={"flex flex-col justify-center items-center my-12"}>
        <h1 className={"underline underline-offset-8 font-bold text-5xl"}>
          Global Chat
        </h1>
        <div
          className={
            "w-full mt-10 flex flex-col md:flex-row justify-center gap-5"
          }
        >
          <div className={"w-full md:w-1/2"}>
            <div
              id={"chat-box"}
              className={
                "overflow-auto h-[40rem] p-5 border border-black dark:border-white rounded"
              }
            >
              {messages &&
                messages.map((message, _index) => {
                  if (message.userId === user?.userId) {
                    return <ChatLeft message={message} key={_index} />;
                  } else {
                    return <ChatRight message={message} key={_index} />;
                  }
                })}
            </div>
            <form
              className={"flex flex-col gap-2 w-full mt-5"}
              onSubmit={handleClickSendMessage}
            >
              <label className={"font-bold"}>Enter your message:</label>
              <div className={"flex gap-2"}>
                <input
                  className="input input-bordered w-full p-4"
                  name={"message"}
                  value={formData.message}
                  onChange={handleChange}
                ></input>
                <div className="relative">
                  <button type={"button"} className={"btn btn-primary"}>
                    <i className="bi bi-image text-xl"></i>
                  </button>
                  <input
                    type="file"
                    name={"imageFile"}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                  />
                </div>
                <button type={"submit"} className={"btn btn-primary"}>
                  <i className="bi bi-send text-xl"></i>
                </button>
              </div>
            </form>
          </div>
          <div>
            <div
              className={
                "overflow-auto h-[40rem] p-5 border border-black dark:border-white rounded gap-3 flex flex-col"
              }
            >
              <div className={"flex items-center gap-2"}>
                <i className="bi bi-circle-fill text-sm text-green-500 animate-pulse"></i>
                <h3>Online:</h3>
              </div>
              {userList &&
                userList.map((user) => {
                  return <UserItem user={user} key={user.userId} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
