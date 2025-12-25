import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { shopEndPoints } from "../api";
import { setShopSlice } from "../../redux/slices/shop";

const {
    GET_MY_SHOP_API,
    UPDATE_CONTACT_INFO_API,
    UPDATE_SHOP_ADDRESS_API,
    UPDATE_SHOP_PROFILE_API,
    UPDATE_SHOP_TIMING_API
} = shopEndPoints;


export const fetchMyShop = async (token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "GET",
      url: GET_MY_SHOP_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("fetch my shop api response", response);
      result = response.data;
      dispatch(setShopSlice(response.data.data))
    }
  } catch (err) {
    console.log("fetch my shop api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};


export const updateShopProfile = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_SHOP_PROFILE_API,
      data: data, 
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("update shop profile response", response);
      result = response.data;
      dispatch(setShopSlice(response.data.data))
    }
  } catch (err) {
    console.log("update shop profile error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};


export const updateContactInfo = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_CONTACT_INFO_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("update contact info response", response);
      result = response.data;
      dispatch(setShopSlice(response.data.data))
    }
  } catch (err) {
    console.log("update contact info error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};


export const updateShopAddress = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_SHOP_ADDRESS_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("update shop address response", response);
      result = response.data;
      dispatch(setShopSlice(response.data.data))
    }
  } catch (err) {
    console.log("update shop address error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const updateShopTiming = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_SHOP_TIMING_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("update shop timing response", response);
      result = response.data;
      dispatch(setShopSlice(response.data.data))
    }
  } catch (err) {
    console.log("update shop timing error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};





