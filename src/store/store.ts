import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice.ts";
import { friendReducer } from "./friendSlice.ts";
import { conversationReducer } from "./conversationSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    conversation: conversationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
