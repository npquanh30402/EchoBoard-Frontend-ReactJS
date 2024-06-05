import { createSlice } from "@reduxjs/toolkit";
import { ConversationInterface, FriendInterface } from "../interfaces";

type ConversationStateType = {
  activeUser: FriendInterface | null;
  messages: {
    [id: string]: ConversationInterface[];
  };
  unread_counts: {
    [id: string]: number;
  };
};

const conversationInitialState: ConversationStateType = {
  activeUser: null,
  messages: {},
  unread_counts: {},
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
      const sentByCurrentUser = action.payload.sentByCurrentUser;

      if (state.messages[userId]) {
        state.messages[userId].push(action.payload.message);
      } else {
        state.messages[userId] = [action.payload.message];
      }

      if (!sentByCurrentUser) {
        state.unread_counts[userId] = (state.unread_counts[userId] || 0) + 1;
      }
    },
    DECREASE_UNREAD_COUNT: (state, action) => {
      const userId = action.payload;

      if (state.unread_counts[userId]) {
        state.unread_counts[userId] = 0;
      }
    },
  },
});

export const { ADD_MESSAGE, SET_ACTIVE_USER, DECREASE_UNREAD_COUNT } =
  conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
