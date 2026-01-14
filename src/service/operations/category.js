import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { categoryEndPoints, shopCategoryEndPoints } from "../api";

const {
  CREATE_CATEGORY_API,
  GET_ALL_CATEGORIES_API,
  TOGGLE_CATEGORY_STATUS_API,
  UPDATE_CATEGORY_API,
  GET_ALL_ACTIVE_CATEGORIES_API,
} = categoryEndPoints;

const {
  GET_SHOP_CATEGORIES_API,
  GET_SINGLE_SHOP_CATEGORY_API, // single category details
  PICK_CATEGORIES_API,
  REMOVE_SHOP_CATEGORY_API,
  TOGGLE_SHOP_CATEGORY_API,
  PICK_TAGS_API,
  REMOVE_TAG_API,
} = shopCategoryEndPoints;

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

export const pickCategoriesForShop = async (data, dispatch, token) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "POST",
      url: PICK_CATEGORIES_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("pick categories response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("pick categories error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getShopCategories = async (shopId, dispatch) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "POST",
      url: GET_SHOP_CATEGORIES_API,
      data: { shopId },
      withCredentials: true,
    });

    if (response) {
      console.log("get shop categories", response);
      result = response.data;
    }
  } catch (err) {
    console.log("get shop categories error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const getSingleShopCategory = async (shopCategoryId, dispatch) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "POST",
      url: GET_SINGLE_SHOP_CATEGORY_API,
      data: { shopCategoryId },
      withCredentials: true,
    });

    if (response) {
      console.log("single shop category", response);
      result = response.data;
    }
  } catch (err) {
    console.log("single shop category error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const removeShopCategory = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "DELETE",
      url: REMOVE_SHOP_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("remove shop category", response);
      result = response.data;
    }
  } catch (err) {
    console.log("remove shop category error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const toggleShopCategory = async (data, token, dispatch) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "PUT",
      url: TOGGLE_SHOP_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("toggle shop category", response);
      result = response.data;
    }
  } catch (err) {
    console.log("toggle shop category error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const pickTags = async (data, dispatch, token) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "PUT",
      url: PICK_TAGS_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("pick tag response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("pick tag error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};

export const removeTags = async (data, dispatch, token) => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios({
      method: "PUT",
      url: REMOVE_TAG_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      console.log("remove tag response", response);
      result = response.data;
    }
  } catch (err) {
    console.log("remove tag error", err);
  }

  dispatch(setUserLoading(false));
  return result;
};





