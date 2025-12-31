import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { tagEndPoints } from "../api";

const {
  CREATE_TAG_API,
  GET_ALL_TAG_API,
  UPDATE_TAG_API,
  TOGGLE_TAG_STATUS_API,
  GET_ALL_ACTIVE_TAG_API,
} = tagEndPoints;

export const createTag = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: CREATE_TAG_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Tag creation api response", response);
    }
  } catch (err) {
    console.log("error occured in Creating Tag ", err);
  }
  dispatch(setUserLoading(false));
};

export const updateTag = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: UPDATE_TAG_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Tag updation api response", response);
    }
  } catch (err) {
    console.log("error occured in updating Tag ", err);
  }
  dispatch(setUserLoading(false));
};

export const toggleTagStatus = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: TOGGLE_TAG_STATUS_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("Tag status toggle api response", response);
    }
  } catch (err) {
    console.log("Tag status toggle api response ", err);
  }
  dispatch(setUserLoading(false));
};

export const fetchAllTag = async (token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await axios({
      method: "GET",
      url: GET_ALL_TAG_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("fetch all tag api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("fetch all tag api resonse", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

export const fetchAllActiveTag = async (token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await axios({
      method: "GET",
      url: GET_ALL_ACTIVE_TAG_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("fetch all Active tag api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("fetch all ACtive tag api resonse", err);
  }
  dispatch(setUserLoading(false));
  return result;
};
