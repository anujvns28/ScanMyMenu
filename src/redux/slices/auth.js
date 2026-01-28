import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  authLoading: false,
  userLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("shopDetails");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setAuthLoading, setUser, setUserLoading, logout } =
  authSlice.actions;

export default authSlice.reducer