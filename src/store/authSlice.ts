import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/UserInterface.ts";

type AuthStateType = {
  user: UserInterface | null;
};

const authInitialState: AuthStateType = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export const authReducer = authSlice.reducer;
