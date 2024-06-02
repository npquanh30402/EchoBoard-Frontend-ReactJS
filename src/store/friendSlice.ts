import { createSlice } from "@reduxjs/toolkit";
import { FriendInterface } from "../interfaces";

type AuthStateType = {
  friendList: FriendInterface[] | null;
};

const authInitialState: AuthStateType = {
  friendList: [],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState: authInitialState,
  reducers: {
    SET_FRIEND_LIST(state, action) {
      state.friendList = action.payload;
    },
  },
});

export const { SET_FRIEND_LIST } = friendSlice.actions;

export const friendReducer = friendSlice.reducer;
