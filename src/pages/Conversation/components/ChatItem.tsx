import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ChatLeft } from "./ChatLeft.tsx";
import { ChatRight } from "./ChatRight.tsx";
import { SET_MESSAGES } from "../../../store/conversationSlice.ts";
import { sanitizeAndTrimString } from "../../../utils";
import { fetchMessagesService, storeMessagesService } from "../../../services";

export const ChatItem = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { activeConversation, messages, fetchCursors, isFinished } =
    useAppSelector((state) => state.conversation);

  const userMessages = messages[activeConversation?.conversationId as string];

  const conversationFetchCursor =
    fetchCursors[activeConversation?.conversationId as string];

  const conversationIsFinished =
    isFinished[activeConversation?.conversationId as string];

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    message: "",
  });

  const fetchMessages = useCallback(async () => {
    if (!activeConversation || conversationIsFinished) return;

    const formData = {
      cursor: conversationFetchCursor,
    };

    const response = await fetchMessagesService(
      activeConversation?.conversationId as string,
      formData,
    );

    if (response) {
      dispatch(
        SET_MESSAGES({
          conversationId: activeConversation?.conversationId,
          message: response,
        }),
      );
    }
  }, [
    activeConversation,
    conversationFetchCursor,
    conversationIsFinished,
    dispatch,
  ]);

  useEffect(() => {
    fetchMessages().then(() => scrollToBottom());
  }, [activeConversation, fetchMessages]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickSendMessage = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.message.length > 0) {
      const data = {
        conversationId: activeConversation?.conversationId as string,
        messageContent: sanitizeAndTrimString(formData.message),
        receiverId: activeConversation?.otherUser.userId as string,
      };
      await storeMessagesService(data);

      setFormData({
        message: "",
      });
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [activeConversation]);

  useEffect(() => {
    const container = containerRef.current;

    function handleScroll() {
      if (container) {
        const { scrollTop } = container;
        if (scrollTop === 0 && !conversationIsFinished) {
          fetchMessages().then(() => (container.scrollTop = 100));
        }
      }
    }

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [conversationIsFinished, fetchMessages]);

  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    if (userMessages && userMessages.length > 0) {
      if (userMessages[userMessages.length - 1].sender.userId === user?.userId)
        scrollToBottom();
    }
  }, [user, userMessages]);

  return (
    <div className={"my-4 w-full px-4 md:px-12 flex flex-col justify-between"}>
      <div
        ref={containerRef}
        id={"chat-box"}
        className={"overflow-auto h-[40rem]"}
      >
        {userMessages &&
          userMessages.map((message) => {
            if (message.sender.userId === user?.userId) {
              return <ChatLeft message={message} key={message.messageId} />;
            } else {
              return <ChatRight message={message} key={message.messageId} />;
            }
          })}
      </div>
      <form
        className={"flex flex-col gap-2 mt-"}
        onSubmit={handleClickSendMessage}
      >
        {activeConversation && (
          <>
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
          </>
        )}
      </form>
    </div>
  );
};
