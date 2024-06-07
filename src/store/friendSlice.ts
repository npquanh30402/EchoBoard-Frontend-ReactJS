import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CursorSearchInterface, FriendInterface } from "../interfaces";
import { FriendEnum } from "../enums";

type FriendStateType = {
  friendList: FriendInterface[];
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
  friendList: [],
  requestSentList: [],
  friendRequestList: [],
  fetchCursors: {
    [FriendEnum.FriendList]: undefined,
    [FriendEnum.FriendRequestList]: undefined,
    [FriendEnum.RequestSentList]: undefined,
  },
  isFinished: {
    [FriendEnum.FriendList]: false,
    [FriendEnum.RequestSentList]: false,
    [FriendEnum.FriendRequestList]: false,
  },
};

// @ts-ignore
const updateList = (state, action, listName: FriendEnum) => {
  if (action.payload.length > 0) {
    state[listName] = [...state[listName], ...action.payload];
    const lastItem = state[listName][state[listName].length - 1];
    state.fetchCursors[listName] = {
      id: lastItem.id,
      createdAt: lastItem.createdAt,
    };
  } else {
    state.isFinished[listName] = true;
  }
};

export const friendSlice = createSlice({
  name: "friend",
  initialState: friendInitialState,
  reducers: {
    SET_FRIEND_LIST(state, action) {
      updateList(state, action, FriendEnum.FriendList);
    },
    SET_FRIEND_REQUEST_LIST(state, action) {
      updateList(state, action, FriendEnum.FriendRequestList);
    },
    SET_REQUEST_SENT_LIST(state, action) {
      updateList(state, action, FriendEnum.RequestSentList);
    },
    ADD_FRIEND(state, action) {
      const newFriend = action.payload;
      state.friendList.push(newFriend);
      state.friendRequestList = state.friendRequestList.filter(
        (friend) => friend.id !== newFriend.id,
      );
      state.requestSentList = state.requestSentList.filter(
        (friend) => friend.id !== newFriend.id,
      );

      if (state.friendList.length > 0) {
        const lastItem = state.friendList[state.friendList.length - 1];
        state.fetchCursors[FriendEnum.FriendList] = {
          id: lastItem.id,
          createdAt: lastItem.createdAt,
        };
      }
    },
    ADD_FRIEND_FROM_SEND(state, action) {
      const newFriend = action.payload;
      state.friendRequestList.push(newFriend);

      if (state.friendRequestList.length > 0) {
        const lastItem =
          state.friendRequestList[state.friendRequestList.length - 1];
        state.fetchCursors[FriendEnum.FriendRequestList] = {
          id: lastItem.id,
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
        (friend) => friend.id !== removedFriend.id,
      );
    },
  },
});

export const {
  SET_FRIEND_LIST,
  ADD_FRIEND,
  REMOVE_FRIEND,
  SET_FRIEND_REQUEST_LIST,
  SET_REQUEST_SENT_LIST,
  ADD_FRIEND_FROM_SEND,
} = friendSlice.actions;

export const friendReducer = friendSlice.reducer;
