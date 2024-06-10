import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../enums";

type themeStateType = {
  theme: string | null;
};

const themeInitialState: themeStateType = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : Theme.DARK,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    SET_THEME: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { SET_THEME } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
