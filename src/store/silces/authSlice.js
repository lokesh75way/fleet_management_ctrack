import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  token: null,
  permissions: [],
  role: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      state.user = data.user;
      state.token = data.token;
      state.permissions = data.permissions?.[0]?.permissions;
      state.role = data.user.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.permissions = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default persistReducer(
  {
    key: "auth",
    storage,
  },
  authSlice.reducer
);
