import { FriendSidebar } from "./components/FriendSidebar.tsx";
import { useDocumentTitle } from "../../hooks";

export const ConversationPage = () => {
  useDocumentTitle("Conversation");

  // const { user, profile } = useAppSelector((state) => state.auth);
  // const { activeUser, messages } = useAppSelector(
  //   (state) => state.conversation,
  // );
  // const [socketUrl, setSocketUrl] = useState<string | null>(null);
  // const userMessages = messages[activeUser?.id as string];
  //
  // const dispatch = useAppDispatch();
  //
  // const { sendJsonMessage, lastJsonMessage, getWebSocket, readyState } =
  //   useWebSocket(socketUrl, {
  //     share: true,
  //     onOpen: () => console.log("opened"),
  //     onClose: () => console.log("closed"),
  //   });
  //
  // useEffect(() => {
  //   setSocketUrl(
  //     import.meta.env.VITE_WEBSOCKET_URL + `/ws/conversation/${activeUser?.id}`,
  //   );
  // }, [activeUser?.id]);
  //
  // useEffect(() => {
  //   if (lastJsonMessage !== null && readyState === 1) {
  //     dispatch(
  //       ADD_MESSAGE({
  //         userId: activeUser?.id as string,
  //         message: lastJsonMessage,
  //       }),
  //     );
  //   }
  // // }, [dispatch, lastJsonMessage]);
  //
  // function formatTime(date: Date) {
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //
  //   return `${hours}:${minutes}`;
  // }
  //
  // const [formData, setFormData] = useState({
  //   message: "",
  // });
  //
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  //
  // const handleClickSendMessage = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //
  //   if (formData.message.length > 0) {
  //     sendJsonMessage({
  //       profilePictureUrl: profile?.profilePictureUrl,
  //       message: DOMPurify.sanitize(formData.message),
  //       date: formatTime(new Date()),
  //     });
  //
  //     setFormData({
  //       message: "",
  //     });
  //   }
  // };

  return (
    <section id={"conversation"}>
      <div className={"mx-auto rounded-xl flex"}>
        <div>
          <FriendSidebar />
        </div>

        <div
          className={"my-4 w-full px-4 md:px-12 flex flex-col justify-between"}
        >
          <div className={"overflow-auto h-[40rem]"}>
            {/*{userMessages &&*/}
            {/*  userMessages.map((message, idx) => {*/}
            {/*    if (message.id === user?.id) {*/}
            {/*      return <ChatLeft message={message} key={idx} />;*/}
            {/*    } else {*/}
            {/*      return <ChatRight message={message} key={idx} />;*/}
            {/*    }*/}
            {/*  })}*/}
          </div>
          {/*<form*/}
          {/*  className={"flex flex-col gap-2 mt-"}*/}
          {/*  onSubmit={handleClickSendMessage}*/}
          {/*>*/}
          {/*  <label className={"font-bold"}>Enter your message:</label>*/}
          {/*  <div className={"flex gap-2 h-full"}>*/}
          {/*    <input*/}
          {/*      className="input input-bordered w-full h-full"*/}
          {/*      name={"message"}*/}
          {/*      value={formData.message}*/}
          {/*      onChange={handleChange}*/}
          {/*    ></input>*/}
          {/*    <button type={"submit"} className={"btn btn-primary h-full"}>*/}
          {/*      Send*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</form>*/}
        </div>
      </div>
    </section>
  );
};
