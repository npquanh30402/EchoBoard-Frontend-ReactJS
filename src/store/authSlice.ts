import { createSlice } from "@reduxjs/toolkit";
import { ProfileInterface, UserInterface } from "../interfaces";

type AuthStateType = {
  user: UserInterface | null;
  profile?: ProfileInterface | null;
};

const authInitialState: AuthStateType = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile") as string)
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
      state.profile = null;
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
    },
    PROFILE: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
  },
});

export const { LOGIN, LOGOUT, PROFILE } = authSlice.actions;

export const authReducer = authSlice.reducer;
