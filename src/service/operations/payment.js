import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { orderEndPoints } from "../api";
import { setActiveOrder } from "../../redux/slices/order";

const { CREATE_ORDER_API, GET_MY_ACTIVE_ORDER, VERIFY_PAYMENT_API } =
  orderEndPoints;

export const createRazorpayOrder = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: CREATE_ORDER_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("Razorpay order response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("Razorpay order error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const openRazorpayCheckout = (order, user, onSuccess) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: order.amount,
    currency: "INR",
    name: "ScanMyMenu",
    description: "Food Order",
    order_id: order.id,

    handler: function (response) {
      onSuccess(response);
    },

    prefill: {
      name: user?.name || "Guest",
      email: user?.email || "guest@scanmymenu.com",
    },

    theme: {
      color: "#000000",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export const verifyRazorpayPayment = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: VERIFY_PAYMENT_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("Payment verify response", response);
      result = response.data;
      dispatch(setActiveOrder(result.order));
      localStorage.setItem("order", JSON.stringify(result.order));
    }
  } catch (err) {
    console.log("Payment verify error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};
