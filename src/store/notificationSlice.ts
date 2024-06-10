import { createSlice } from "@reduxjs/toolkit";
import { CursorSearchInterface, NotificationInterface } from "../interfaces";

type NotificationStateType = {
  notifications: NotificationInterface[];
  unreadCount: number;
  fetchCursor: CursorSearchInterface | undefined;
  hasMore: boolean;
};

const notificationInitialState: NotificationStateType = {
  notifications: [],
  unreadCount: 0,
  fetchCursor: undefined,
  hasMore: true,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    SET_UNREAD_COUNT: (state, action) => {
      state.unreadCount = action.payload;
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
        state.hasMore = false;
      }
    },
    ADD_NOTIFICATION: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount++;
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

      state.unreadCount--;
    },
    MARK_ALL_NOTIFICATION_AS_READ: (state) => {
      state.notifications.forEach((notification) => {
        notification.isRead = true;
      });

      state.unreadCount = 0;
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
