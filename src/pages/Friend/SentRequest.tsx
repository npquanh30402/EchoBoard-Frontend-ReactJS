import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { fetchRequestSentService } from "../../services";
import { SET_REQUEST_SENT_LIST } from "../../store/friendSlice.ts";
import { FriendItem } from "./components/FriendItem.tsx";
import { FriendEnum } from "../../enums";

export const SentRequest = () => {
  const { requestSentList, fetchCursors, isFinished } = useAppSelector(
    (state) => state.friend,
  );
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const cursor = fetchCursors[FriendEnum.RequestSentList];
  const friendIsFinished = isFinished[FriendEnum.RequestSentList];

  async function fetchFriend() {
    if (friendIsFinished) return;

    const formData = {
      cursor,
    };

    const response = await fetchRequestSentService(formData);

    if (response) {
      dispatch(SET_REQUEST_SENT_LIST(response));
      setHasMore(response.length > 0);
    }
  }

  useEffect(() => {
    fetchFriend();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 5 &&
        friendIsFinished
      ) {
        fetchFriend();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchFriend, hasMore]);

  return (
    <>
      <div className={"flex flex-wrap gap-4 justify-center"}>
        {requestSentList &&
          requestSentList.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              type={FriendEnum.RequestSentList}
            />
          ))}
      </div>
    </>
  );
};
