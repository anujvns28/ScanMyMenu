const BASE_URL = import.meta.env.VITE_BASE_URL;


export const authEndPoints = {
  SIGN_UP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  LOGIN_WITH_TOKEN_API: BASE_URL + "/auth/loginWithToken",
};

export const categoryEndPoints = {
  CREATE_CATEGORY_API: BASE_URL + "/category/createCategory",
  UPDATE_CATEGORY_API: BASE_URL + "/category/updateCategory",
  GET_ALL_CATEGORIES_API: BASE_URL + "/category/getAllCategories",
  TOGGLE_CATEGORY_STATUS_API: BASE_URL + "/category/toggleCategoryStatus",
  GET_ALL_ACTIVE_CATEGORIES_API: BASE_URL + "/category/getActiveCategories",
};

export const tagEndPoints = {
  CREATE_TAG_API: BASE_URL + "/tag/createTag",
  UPDATE_TAG_API: BASE_URL + "/tag/updateTag",
  GET_ALL_TAG_API: BASE_URL + "/tag/getAllTag",
  TOGGLE_TAG_STATUS_API: BASE_URL + "/tag/toggleTagStatus",
};

export const shopEndPoints = {
  GET_MY_SHOP_API: BASE_URL + "/shop/my-shop",
  UPDATE_SHOP_PROFILE_API: BASE_URL + "/shop/profile",
  UPDATE_CONTACT_INFO_API: BASE_URL + "/shop/contact",
  UPDATE_SHOP_ADDRESS_API: BASE_URL + "/shop/address",
  UPDATE_SHOP_TIMING_API: BASE_URL + "/shop/timing",
};
