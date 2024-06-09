import { createSlice } from "@reduxjs/toolkit";
import { CursorSearchInterface, NotificationInterface } from "../interfaces";

type NotificationStateType = {
  notifications: NotificationInterface[];
  unread_count: number;
  fetchCursor: CursorSearchInterface | undefined;
  isFinished: boolean;
};

const notificationInitialState: NotificationStateType = {
  notifications: [],
  unread_count: 0,
  fetchCursor: undefined,
  isFinished: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    SET_UNREAD_COUNT: (state, action) => {
      state.unread_count = action.payload;
    },
    SET_NOTIFICATIONS: (state, action) => {
      if (action.payload.length > 0) {
        state.notifications = [...state.notifications, ...action.payload];
        const lastItem = state.notifications[state.notifications.length - 1];
        state.fetchCursor = {
          id: lastItem.notificationId!,
          createdAt: lastItem.createdAt,
        };
      } else {
        state.isFinished = true;
      }
    },
    ADD_NOTIFICATION: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unread_count++;
      const lastItem = state.notifications[state.notifications.length - 1];
      state.fetchCursor = {
        id: lastItem.notificationId!,
        createdAt: lastItem.createdAt,
      };
    },
    MARK_READ_NOTIFICATION: (state, action) => {
      const notification = state.notifications.find(
        (notification) => notification.notificationId === action.payload,
      );
      if (notification) {
        notification.isRead = true;
      }

      state.unread_count--;
    },
    MARK_ALL_NOTIFICATION_AS_READ: (state) => {
      state.notifications.forEach((notification) => {
        notification.isRead = true;
      });

      state.unread_count = 0;
    },
  },
});

export const {
  SET_NOTIFICATIONS,
  MARK_READ_NOTIFICATION,
  ADD_NOTIFICATION,
  SET_UNREAD_COUNT,
  MARK_ALL_NOTIFICATION_AS_READ,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
