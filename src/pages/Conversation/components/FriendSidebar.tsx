import { FriendItem } from "./FriendItem.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";
import { fetchFriendService } from "../../../services/friendService.ts";
import { SET_FRIEND_LIST } from "../../../store/friendSlice.ts";

export const FriendSidebar = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchFriend() {
      const response = await fetchFriendService(page, perPage);
      if (response) {
        dispatch(SET_FRIEND_LIST(response));
      }
    }

    if (friendList?.length === 0) {
      fetchFriend();
    }
  }, [dispatch, friendList, page, perPage]);

  return (
    <>
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
    </>
  );
};
