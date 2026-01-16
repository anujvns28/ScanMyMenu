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
  GET_ALL_ACTIVE_TAG_API: BASE_URL + "/tag/getActiveTag",
};

export const shopEndPoints = {
  GET_MY_SHOP_API: BASE_URL + "/shop/my-shop",
  GET_SHOP_DETAILD_API: BASE_URL + "/shop/getShopDetails",
  UPDATE_SHOP_PROFILE_API: BASE_URL + "/shop/profile",
  UPDATE_CONTACT_INFO_API: BASE_URL + "/shop/contact",
  UPDATE_SHOP_ADDRESS_API: BASE_URL + "/shop/address",
  UPDATE_SHOP_TIMING_API: BASE_URL + "/shop/timing",
};

export const shopCategoryEndPoints = {
  PICK_CATEGORIES_API: BASE_URL + "/shop-category/pickCategories",
  GET_SHOP_CATEGORIES_API: BASE_URL + "/shop-category/getCategories",
  GET_SINGLE_SHOP_CATEGORY_API: BASE_URL + "/shop-category/shopCategoryDetails",
  REMOVE_SHOP_CATEGORY_API: BASE_URL + "/shop-category/remove",
  TOGGLE_SHOP_CATEGORY_API: BASE_URL + "/shop-category/toggleCategory",
  PICK_TAGS_API: BASE_URL + "/shop-category/pickTags",
  REMOVE_TAG_API: BASE_URL + "/shop-category/removeTag",
};

export const productEndPoints = {
  ADD_PRODUCT_API: BASE_URL + "/product/addProduct",
  FETCH_CATEGORY_INFO_AND_PRODUCT: BASE_URL + "/product/fetchCategoryProduct",
  UPDATE_PRODUCT_API: BASE_URL + "/product/updateProduct",
  GET_TOP_RATED_PRODUCT: BASE_URL + "/product/topRatedProducts",
  GET_PRODUCT_DETAILS: BASE_URL + "/product/getProductDetails",
};

export const ratingAndReviews = {
  ADD_RATING_AND_REVIEW: BASE_URL + "/rating/add",
  EDIT_RATING_AND_REVIEW: BASE_URL + "/rating/edit",
  GET_ALL_REVIEW: BASE_URL + "/rating/allReview",
  GET_RATING_SUMMARY: BASE_URL + "/rating/ratingSummary",
  GET_USER_REVIEW: BASE_URL + "/rating/has-reviewed",
};


export const orderEndPoints = {
  // User
  CREATE_ORDER_API: BASE_URL + "/orders/create",
  VERIFY_PAYMENT_API: BASE_URL + "/orders/payment/verify",
  GET_MY_ACTIVE_ORDER: BASE_URL + "/orders/my-active",

  // Kitchen
  // GET_KITCHEN_ORDERS:  `${BASE_URL}/orders/kitchen/${shopId}`,

  // UPDATE_ORDER_STATUS:  `${BASE_URL}/orders/${orderId}/status`,
};