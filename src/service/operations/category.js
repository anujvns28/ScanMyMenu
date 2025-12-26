import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { categoryEndPoints } from "../api";

const {
  CREATE_CATEGORY_API,
  GET_ALL_CATEGORIES_API,
  TOGGLE_CATEGORY_STATUS_API,
  UPDATE_CATEGORY_API,
  GET_ALL_ACTIVE_CATEGORIES_API,
} = categoryEndPoints;

export const createCategory = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: CREATE_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Category creation api response", response);
    }
  } catch (err) {
    console.log("error occured in Creating Category ", err);
  }
  dispatch(setUserLoading(false));
};

export const updateCategory = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: UPDATE_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Category updation api response", response);
    }
  } catch (err) {
    console.log("error occured in updating Category ", err);
  }
  dispatch(setUserLoading(false));
};

export const toggleCategoryStatus = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: TOGGLE_CATEGORY_STATUS_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Category status toggle api response", response);
    }
  } catch (err) {
    console.log("Category status toggle api response ", err);
  }
  dispatch(setUserLoading(false));
};

export const fetchAllCategory = async (token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: GET_ALL_CATEGORIES_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("fetch all category api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("fetch all category api resonse", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

export const fetchAllActiveCategory = async (dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await axios({
      method: "GET",
      url: GET_ALL_ACTIVE_CATEGORIES_API,
      withCredentials: true,
    });

    if (response) {
      console.log("fetch all Active category api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("fetch all Active category api resonse", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

