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
};
