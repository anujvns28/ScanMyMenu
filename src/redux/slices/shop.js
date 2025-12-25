import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shop: localStorage.getItem("shop")
    ? JSON.parse(localStorage.getItem("shop"))
    : null,
  
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
   
    setShopSlice: (state, action) => {
      state.shop = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShopSlice } =
  shopSlice.actions;

export default shopSlice.reducer