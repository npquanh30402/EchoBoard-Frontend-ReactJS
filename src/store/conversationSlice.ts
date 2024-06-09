import { createSlice } from "@reduxjs/toolkit";
import {
  ConversationInterface,
  CursorSearchInterface,
  MessageInterface,
} from "../interfaces";

type ConversationStateType = {
  activeConversation: ConversationInterface | null;
  messages: {
    [id: string]: MessageInterface[];
  };
  unread_counts: {
    [id: string]: number;
  };
  fetchCursors: {
    [id: string]: CursorSearchInterface | undefined;
  };
  isFinished: {
    [id: string]: boolean;
  };
};

const conversationInitialState: ConversationStateType = {
  activeConversation: null,
  messages: {},
  unread_counts: {},
  fetchCursors: {},
  isFinished: {},
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: conversationInitialState,
  reducers: {
    SET_ACTIVE_CONVERSATION: (state, action) => {
      state.activeConversation = action.payload;
    },
    SET_MESSAGES: (state, action) => {
      const conversationId = action.payload.conversationId;
      const newMessages = action.payload.message as MessageInterface[];

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      const existingMessageIds = new Set(
        state.messages[conversationId].map((msg) => msg.messageId),
      );
      state.messages[conversationId] = [
        ...newMessages.filter((msg) => !existingMessageIds.has(msg.messageId)),
        ...state.messages[conversationId],
      ];

      if (newMessages.length > 0) {
        const firstItem = state.messages[conversationId][0];
        state.fetchCursors[conversationId] = {
          id: firstItem.messageId,
          createdAt: firstItem.createdAt,
        };

        state.isFinished[conversationId] = false;
      } else {
        state.isFinished[conversationId] = true;
      }
    },
    ADD_MESSAGE: (state, action) => {
      const conversationId = action.payload.conversationId;
      const newMessage = action.payload.message as MessageInterface;
      const sentByCurrentUser = action.payload.sentByCurrentUser;

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(newMessage);

      if (!sentByCurrentUser) {
        state.unread_counts[conversationId] =
          (state.unread_counts[conversationId] || 0) + 1;
      }
    },
    DECREASE_UNREAD_COUNT: (state, action) => {
      const conversationId = action.payload;

      if (state.unread_counts[conversationId]) {
        state.unread_counts[conversationId] = 0;
      }
    },
  },
});

export const {
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_ACTIVE_CONVERSATION,
  DECREASE_UNREAD_COUNT,
} = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
