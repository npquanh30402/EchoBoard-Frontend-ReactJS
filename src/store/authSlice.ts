import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/UserInterface.ts";

type AuthStateType = {
  user: UserInterface | null;
};

const authInitialState: AuthStateType = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export const authReducer = authSlice.reducer;
