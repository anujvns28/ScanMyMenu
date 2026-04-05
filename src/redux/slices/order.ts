import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderDetails } from "../../types/order";

type initialStateType = {
  activeOrder : OrderDetails | null
}

const initialState : initialStateType = {
  activeOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
    setActiveOrder: (state, action:PayloadAction<OrderDetails | null>) => {
      state.activeOrder = action.payload;
    },

    updateOrderStatus: (state, action:PayloadAction<string>) => {
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
