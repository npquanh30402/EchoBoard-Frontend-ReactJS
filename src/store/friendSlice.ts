import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CursorSearchInterface, FriendInterface } from "../interfaces";
import { FriendEnum } from "../enums";

type FriendStateType = {
  acceptedFriends: FriendInterface[];
  requestSentList: FriendInterface[];
  friendRequestList: FriendInterface[];
  fetchCursors: {
    [key in FriendEnum]: CursorSearchInterface | undefined;
  };
  isFinished: {
    [key in FriendEnum]: boolean;
  };
};

const friendInitialState: FriendStateType = {
  acceptedFriends: [],
  requestSentList: [],
  friendRequestList: [],
  fetchCursors: {
    [FriendEnum.AcceptedFriends]: undefined,
    [FriendEnum.FriendRequestList]: undefined,
    [FriendEnum.RequestSentList]: undefined,
  },
  isFinished: {
    [FriendEnum.AcceptedFriends]: false,
    [FriendEnum.RequestSentList]: false,
    [FriendEnum.FriendRequestList]: false,
  },
};

export const friendSlice = createSlice({
  name: "friend",
  initialState: friendInitialState,
  reducers: {
    SET_ACCEPTED_FRIENDS(state, action) {
      const listName = FriendEnum.AcceptedFriends;

      if (action.payload.length > 0) {
        state[listName] = [...state[listName], ...action.payload];
        const lastItem = state[listName][state[listName].length - 1];
        state.fetchCursors[listName] = {
          id: lastItem.userId,
          createdAt: lastItem.createdAt,
        };
      } else {
        state.isFinished[listName] = true;
      }
    },
    SET_FRIEND_REQUEST_LIST(state, action) {
      const listName = FriendEnum.FriendRequestList;

      if (action.payload.length > 0) {
        state[listName] = [...state[listName], ...action.payload];
        const lastItem = state[listName][state[listName].length - 1];
        state.fetchCursors[listName] = {
          id: lastItem.userId,
          createdAt: lastItem.createdAt,
        };
      } else {
        state.isFinished[listName] = true;
      }
    },
    SET_REQUEST_SENT_LIST(state, action) {
      const listName = FriendEnum.RequestSentList;

      if (action.payload.length > 0) {
        state[listName] = [...state[listName], ...action.payload];
        const lastItem = state[listName][state[listName].length - 1];
        state.fetchCursors[listName] = {
          id: lastItem.userId,
          createdAt: lastItem.createdAt,
        };
      } else {
        state.isFinished[listName] = true;
      }
    },
    ADD_FRIEND(
      state,
      action: PayloadAction<{
        newFriend: FriendInterface;
        listName: FriendEnum;
      }>,
    ) {
      const newFriend = action.payload.newFriend;
      const listName = action.payload.listName;

      state[listName].push(newFriend);

      if (state[listName].length > 0) {
        const lastItem = state[listName][state[listName].length - 1];
        state.fetchCursors[listName] = {
          id: lastItem.userId,
          createdAt: lastItem.createdAt,
        };
      }
    },
    REMOVE_FRIEND(
      state,
      action: PayloadAction<{
        removedFriend: FriendInterface;
        listName: FriendEnum;
      }>,
    ) {
      const { removedFriend, listName } = action.payload;

      state[listName] = state[listName].filter(
        (friend) => friend.friendId !== removedFriend.friendId,
      );
    },
  },
});

export const {
  SET_ACCEPTED_FRIENDS,
  ADD_FRIEND,
  REMOVE_FRIEND,
  SET_FRIEND_REQUEST_LIST,
  SET_REQUEST_SENT_LIST,
} = friendSlice.actions;

export const friendReducer = friendSlice.reducer;
