import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shopDetails: localStorage.getItem("shopDetails")
    ? JSON.parse(localStorage.getItem("shopDetails"))
    : null,
};

export const shopSlice = createSlice({
  name: "shopDetails",
  initialState,
  reducers: {
    setShopSlice: (state, action) => {
      state.shopDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShopSlice } =
  shopSlice.actions;

export default shopSlice.reducer