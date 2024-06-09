import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCallback, useEffect } from "react";
import { fetchFriendService } from "../../services";
import { SET_ACCEPTED_FRIENDS } from "../../store/friendSlice.ts";
import { FriendItem } from "./components/FriendItem.tsx";
import { FriendEnum } from "../../enums";

export const AcceptedFriends = () => {
  const { acceptedFriends, fetchCursors, isFinished } = useAppSelector(
    (state) => state.friend,
  );

  const dispatch = useAppDispatch();

  const acceptedFriendsCursor = fetchCursors[FriendEnum.AcceptedFriends];
  const acceptedFriendsIsFinished = isFinished[FriendEnum.AcceptedFriends];

  const fetchFriend = useCallback(async () => {
    if (acceptedFriendsIsFinished) return;

    const formData = {
      cursor: acceptedFriendsCursor,
    };

    const response = await fetchFriendService(formData);

    if (response) {
      dispatch(SET_ACCEPTED_FRIENDS(response));
    }
  }, [acceptedFriendsCursor, dispatch]);

  useEffect(() => {
    fetchFriend().then();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 5 &&
        !acceptedFriendsIsFinished
      ) {
        fetchFriend().then();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchFriend, acceptedFriendsIsFinished]);

  return (
    <>
      <div className={"flex flex-wrap gap-4 justify-center"}>
        {acceptedFriends &&
          acceptedFriends.map((friend) => (
            <FriendItem
              key={friend.friendId}
              friend={friend}
              type={FriendEnum.AcceptedFriends}
            />
          ))}
      </div>
    </>
  );
};
