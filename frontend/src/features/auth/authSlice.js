import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isLoggedOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      (state.user = action.payload.user),
        (state.accessToken = action.payload.accessToken);
      state.isLoggedOut = false;
    },
    logout: (state) => {
      (state.user = null), (state.accessToken = null);
      state.isLoggedOut = true;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
