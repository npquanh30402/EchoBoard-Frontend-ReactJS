import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { fetchFriendRequestService } from "../../services";
import { SET_FRIEND_REQUEST_LIST } from "../../store/friendSlice.ts";
import { FriendItem } from "./components/FriendItem.tsx";
import { FriendEnum } from "../../enums";

export const FriendRequest = () => {
  const { friendRequestList, fetchCursors, isFinished } = useAppSelector(
    (state) => state.friend,
  );
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const cursor = fetchCursors[FriendEnum.FriendRequestList];
  const friendIsFinished = isFinished[FriendEnum.FriendRequestList];

  async function fetchFriend() {
    if (friendIsFinished) return;

    const formData = {
      cursor,
    };

    const response = await fetchFriendRequestService(formData);

    if (response) {
      dispatch(SET_FRIEND_REQUEST_LIST(response));
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
        {friendRequestList &&
          friendRequestList.map((friend) => (
            <FriendItem
              key={friend.friendId}
              friend={friend}
              type={FriendEnum.FriendRequestList}
            />
          ))}
      </div>
    </>
  );
};
