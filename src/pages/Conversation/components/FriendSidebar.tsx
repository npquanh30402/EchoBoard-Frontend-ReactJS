import { FriendItem } from "./FriendItem.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect } from "react";
import { fetchFriendService } from "../../../services";
import { SET_FRIEND_LIST } from "../../../store/friendSlice.ts";

export const FriendSidebar = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchFriend() {
      const response = await fetchFriendService(1, 10);
      if (response) {
        dispatch(SET_FRIEND_LIST(response));
      }
    }

    fetchFriend();

    // if (friendList?.length === 0) {
    //   fetchFriend();
    // }
  }, [dispatch]);

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
              friendList.map((friend) => (
                <li key={friend.id}>
                  <FriendItem friend={friend} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
