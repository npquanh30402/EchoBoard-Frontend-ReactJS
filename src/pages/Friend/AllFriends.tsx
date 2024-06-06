import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { fetchFriendService } from "../../services";
import { SET_FRIEND_LIST } from "../../store/friendSlice.ts";
import { FriendItem } from "./components/FriendItem.tsx";
import { FriendEnum } from "../../enums";

export const AllFriends = () => {
  const { friendList, fetchCursors, isFinished } = useAppSelector(
    (state) => state.friend,
  );
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const friendListCursor = fetchCursors[FriendEnum.FriendList];
  const friendListIsFinished = isFinished[FriendEnum.FriendList];

  async function fetchFriend() {
    if (friendListIsFinished) return;

    const formData = {
      cursor: friendListCursor,
    };

    const response = await fetchFriendService(formData);

    if (response) {
      dispatch(SET_FRIEND_LIST(response));
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
        friendListIsFinished
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
        {friendList &&
          friendList.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              type={FriendEnum.FriendList}
            />
          ))}
      </div>
    </>
  );
};
