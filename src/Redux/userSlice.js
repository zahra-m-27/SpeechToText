import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userInfo: {
    name: "مهمان",
    password: 1234,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
