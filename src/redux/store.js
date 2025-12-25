import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/auth";
import shopSlice from "./slices/shop";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
  },
});
