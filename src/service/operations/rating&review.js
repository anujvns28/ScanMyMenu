import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import  {ratingAndReviews}  from "../api"


const {
    ADD_RATING_AND_REVIEW,
    EDIT_RATING_AND_REVIEW,
    GET_ALL_REVIEW,
    GET_RATING_SUMMARY,
    GET_USER_REVIEW
} = ratingAndReviews


export const addRatingAndReview = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: ADD_RATING_AND_REVIEW,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log(" add ratng api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("add ratng api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const editRatingAndReview = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: EDIT_RATING_AND_REVIEW,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log(" edit ratng api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("edit ratng api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getAllReview = async (data, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: GET_ALL_REVIEW,
      data: data,
      withCredentials: true,
    });

    if (response) {
      console.log(" get all  rating and review api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get all rating and review api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getProductRatingSummary = async (data, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: GET_RATING_SUMMARY,
      data: data,
      withCredentials: true,
    });

    if (response) {
      console.log(" get all  rating summary api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get all rating summary api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getUserReviewOfProduct = async (data,token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: GET_USER_REVIEW,
      data: data,
      withCredentials: true,
      headers:{
        Authorization : `Bearer ${token}`
      }
    });

    if (response) {
      console.log(" get user rating and review api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get user rating and review api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

