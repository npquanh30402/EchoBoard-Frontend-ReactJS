import { createSlice } from "@reduxjs/toolkit";
import { CursorSearchInterface, PostInterface } from "../interfaces";

type PostStateType = {
  posts: PostInterface[];
  cursor: CursorSearchInterface | undefined;
  hasMore: boolean;
};

const postInitialState: PostStateType = {
  posts: [],
  cursor: undefined,
  hasMore: true,
};

export const postSlice = createSlice({
  name: "auth",
  initialState: postInitialState,
  reducers: {
    SET_POSTS: (state, action) => {
      if (action.payload.length > 0) {
        state.posts = [...state.posts, ...action.payload];
        const lastItem = state.posts[state.posts.length - 1];
        state.cursor = {
          id: lastItem.postId,
          createdAt: lastItem.createdAt,
        };
      } else {
        state.hasMore = false;
      }
    },
    MODIFY_POST: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.postId === action.payload.postId) {
          return action.payload;
        }
        return post;
      });
    },
  },
});

export const { SET_POSTS, MODIFY_POST } = postSlice.actions;

export const postReducer = postSlice.reducer;
