import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  user: null,
  loader: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = false;
      state.loader = false;
    },
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;