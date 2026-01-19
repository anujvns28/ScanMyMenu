import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },

    
    updateOrderStatus: (state, action) => {
      if (state.activeOrder) {
        state.activeOrder.status = action.payload;
      }
    },

    
    restoreOrder: (state, action) => {
      state.activeOrder = action.payload;
    },

    
    clearOrder: (state) => {
      state.activeOrder = null;
    },
  },
});

export const {
  setActiveOrder,
  updateOrderStatus,
  restoreOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
