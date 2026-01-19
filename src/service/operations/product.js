import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import  {productEndPoints}  from "../api";


const {
  ADD_PRODUCT_API,
  FETCH_CATEGORY_INFO_AND_PRODUCT,
  UPDATE_PRODUCT_API,
  GET_TOP_RATED_PRODUCT,
  GET_PRODUCT_DETAILS,
  GET_FOR_YOU_PRODUCTS,
} = productEndPoints;

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

export const getTopRatedProducts = async (shopId, dispatch) => {
  // dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "GET",
      url: GET_TOP_RATED_PRODUCT,
      params: { shopId },
      withCredentials: true,
    });

    if (response) {
      console.log("get top rated products api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get top rated products api error", err);
  }

  // dispatch(setUserLoading(false));
  return result;
};

export const getProductDetails = async (productId, dispatch) => {
  // dispatch(setUserLoading(true));
  let result;

  try {
    const response = await axios({
      method: "POST",
      url: GET_PRODUCT_DETAILS,
      data: { productId },
      withCredentials: true,
    });

    if (response) {
      console.log("get products details api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get  products detaisl api error", err);
  }

  // dispatch(setUserLoading(false));
  return result;
};

export const getForYouProducts = async (shopId) => {
  let result;

  try {
    const response = await axios({
      method: "GET",
      url: `${GET_FOR_YOU_PRODUCTS}/${shopId}`,
      withCredentials: true,
    });

    if (response) {
      console.log("get for you products details api response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get for you products detaisl api error", err);
  }

  return result;
};
