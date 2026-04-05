import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ShopDetails } from '../../types/shopDetails';

type initialStateType = {
  shopDetails:ShopDetails |null
}

const initialState : initialStateType = {
  shopDetails: localStorage.getItem("shopDetails")
    ? JSON.parse(localStorage.getItem("shopDetails"))
    : null,
};

export const shopSlice = createSlice({
  name: "shopDetails",
  initialState,
  reducers: {
    setShopSlice: (state, action:PayloadAction<ShopDetails | null>) => {
      state.shopDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShopSlice } =
  shopSlice.actions;

export default shopSlice.reducer