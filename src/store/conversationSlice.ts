import { createSlice } from "@reduxjs/toolkit";
import { ConversationInterface, FriendInterface } from "../interfaces";

type ConversationStateType = {
  activeUser: FriendInterface | null;
  messages: {
    [id: string]: ConversationInterface[];
  };
};

const conversationInitialState: ConversationStateType = {
  activeUser: null,
  messages: {},
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: conversationInitialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.activeUser = action.payload;
    },
    ADD_MESSAGE: (state, action) => {
      const userId = action.payload.userId as string;

      if (state.messages[userId]) {
        state.messages[userId].push(action.payload.message);
      } else {
        state.messages[userId] = [action.payload.message];
      }
    },
  },
});

export const { ADD_MESSAGE, SET_ACTIVE_USER } = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
