import axios from "axios";
import { offerEndPoints } from "../api";
import { setUserLoading } from "../../redux/slices/auth";

const {
  CREATE_OFFER_API,
  GET_ACTIVE_OFFERS_API,
  GET_ALL_OFFERS_API,
  TOGGLE_OFFER_API,
  UPDATE_OFFER_API,
  DELETE_OFFER_API,
} = offerEndPoints;

export const createOfferHandler = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: CREATE_OFFER_API,
      data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("create offer response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("create offer error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getAllOffers = async (token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "GET",
      url: GET_ALL_OFFERS_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("get all offers response", response);
      result = response.data;
      // dispatch(setOffers(response.data.offers));
    }
  } catch (err) {
    console.log("get all offers error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getActiveOffers = async (shopId, dispatch) => {
  let result;

  try {
    const response = await axios({
      method: "GET",
      url: GET_ACTIVE_OFFERS_API + `/${shopId}`,
      withCredentials: true,
    });

    if (response) {
      console.log("get active offers response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get active offers error", err);
  }

  return result;
};

export const updateOffer = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_OFFER_API,
      data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("update offer response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("update offer error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const deleteOffer = async (offerId, token) => {
  let result;

  try {
    const response = await axios({
      method: "DELETE",
      url: `${DELETE_OFFER_API}/${offerId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("delete offer response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("delete offer error", err);
  }

  return result;
};
