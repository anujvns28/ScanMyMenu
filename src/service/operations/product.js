import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import  {productEndPoints}  from "../api";


const { ADD_PRODUCT_API, FETCH_CATEGORY_INFO_AND_PRODUCT, UPDATE_PRODUCT_API } =
  productEndPoints;

export const addProduct = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: ADD_PRODUCT_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log(" add Product api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("add product api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const fetchCategoryByProduct = async (data, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: FETCH_CATEGORY_INFO_AND_PRODUCT,
      data: data,
      withCredentials: true,
    });

    if (response) {
      console.log("fetech Category by product response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("fetech Category by product error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const updateProduct = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "PUT",
      url: UPDATE_PRODUCT_API,
      data: data, 
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log(" update Product api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("add product api error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};