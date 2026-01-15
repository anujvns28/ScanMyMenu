import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/auth";
import shopSlice from "./slices/shop";
import orderSlice from "./slices/order";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
    order: orderSlice,
  },
});
