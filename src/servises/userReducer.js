/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  user: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.user = action.payload;
      state.isLogged = true;
    },
    logOut(state) {
      state.isLogged = false;
      state.user = [];
    },
    actionLoginUser(state, action) {
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
