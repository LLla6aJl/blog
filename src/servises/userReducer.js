/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  user: {
    user: {
      username: "",
      email: "",
      token: "",
      image: "",
    },
  },
  token: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.user = action.payload;
      state.token = action.payload.user.token;
      state.isLogged = true;
    },
    logOut(state) {
      state.isLogged = false;
      state.user = {
        user: {
          username: "",
          email: "",
          token: "",
          image: "",
        },
      };
      state.token = "";
    },
    actionLoginUser(state, action) {
      state.token = action.payload.user.token;
      state.user = action.payload;
      state.isLogged = true;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { registerUser, logOut, actionLoginUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
