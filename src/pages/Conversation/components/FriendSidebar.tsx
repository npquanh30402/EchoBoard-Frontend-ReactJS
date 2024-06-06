import { FriendItem } from "./FriendItem.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";
import { fetchFriendService } from "../../../services";
import { SET_FRIEND_LIST } from "../../../store/friendSlice.ts";

export const FriendSidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { friendList, fetchCursors, isFinished } = useAppSelector(
    (state) => state.friend,
  );
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const friendListCursor = fetchCursors["friendList"];
  const friendListIsFinished = isFinished["friendList"];

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
        hasMore
      ) {
        fetchFriend();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchFriend, hasMore]);

  return (
    <div>
      <div className="drawer lg:drawer-open z-10">
        <input id="friend-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center fixed top-[200px] opacity-60">
          <label
            htmlFor="friend-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <i className="bi bi-people-fill"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="friend-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2">
            {friendList &&
              friendList.map(
                (friend) =>
                  user?.id !== friend.id && (
                    <li key={friend.id}>
                      <FriendItem friend={friend} />
                    </li>
                  ),
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};
