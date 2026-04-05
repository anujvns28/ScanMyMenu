import axios from "axios";
import { setUserLoading } from "../../redux/slices/auth";
import { categoryEndPoints, shopCategoryEndPoints } from "../api";
import { AppDispatch } from "../../redux/store";
import type { Category, ShopCategory } from "../../types/category";

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

type ApiResponse<T> = {
  success:boolean
  message:string
  data?: T | null
}

type CategoryData = {
  name:string,
  description:string,
  image:string,
  dietType:string
}

type PickCategoryData = {
  categories:string[]
  shopId:string
}

export const createCategory = async (data:CategoryData, token:string, dispatch:AppDispatch):Promise<void> => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios<ApiResponse<null>>({
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
  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
      console.log("error occured in Creating Category ", err?.response?.data?.message);
    }else{
      console.log("Unexpected create category api Error:", err);
    }
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const updateCategory = async (data:CategoryData, token:string, dispatch:AppDispatch) => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios<ApiResponse<null>>({
      method: "POST",
      url: UPDATE_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

      console.log("Category updation api response", response);

  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
      console.log("error occured in updating Category ", err?.response?.data?.message);
    }
    else{
      console.log("Unexpected update category api Error:", err);
    }
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const toggleCategoryStatus = async (data:{categoryId:string}, token:string, dispatch:AppDispatch):Promise<void> => {
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
  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
      console.log("Category status toggle api response ", err?.response?.data.message);
    }else{
      console.log("unexpected error ",err)
    }
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const fetchAllCategory = async (token:string, dispatch:AppDispatch):Promise<ApiResponse<Category[]>|null> => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios<ApiResponse<Category[]>>({
      method: "POST",
      url: GET_ALL_CATEGORIES_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

      console.log("fetch all category api response", response);
      return response.data;

  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("fetch all category api resonse", err?.response?.data?.message);
    }else{
      console.log("unexpected error occured in fechign all Categyr",err)
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
  
};

export const fetchAllActiveCategory = async (dispatch:AppDispatch):Promise<ApiResponse<Category[]>|null> => {
  dispatch(setUserLoading(true));
  try {
    const response = await axios<ApiResponse<Category[]>>({
      method: "GET",
      url: GET_ALL_ACTIVE_CATEGORIES_API,
      withCredentials: true,
    });

    console.log("fetch all Active category api response", response);
    return response.data;
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("fetch all Active category api resonse", err?.response?.data?.message);
    }else{
      console.log(("unexptected error"),err);
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const pickCategoriesForShop = async (data:PickCategoryData, dispatch:AppDispatch, token:string):Promise<ApiResponse<ShopCategory[]>|null> => {
  dispatch(setUserLoading(true));

  try {
    const response = await axios<ApiResponse<ShopCategory[]>>({
      method: "POST",
      url: PICK_CATEGORIES_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log("pick categories response", response);
      return  response.data;
    
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("pick categories error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err);
    }
    return null
  }
  finally{
    dispatch(setUserLoading(false))
  }
};

export const getShopCategories = async (shopId:string, dispatch:AppDispatch):Promise<ApiResponse<ShopCategory[]> |null>=> {
  dispatch(setUserLoading(true));

  try {
    const response = await axios<ApiResponse<ShopCategory[]>>({
      method: "POST",
      url: GET_SHOP_CATEGORIES_API,
      data: { shopId },
      withCredentials: true,
    });

      console.log("get shop categories", response);
      return response.data;
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("get shop categories error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err)
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }  
};

export const getSingleShopCategory = async (shopCategoryId:string, dispatch:AppDispatch):Promise<ApiResponse<ShopCategory>|null>=> {
  dispatch(setUserLoading(true));

  try {
    const response = await axios<ApiResponse<ShopCategory>>({
      method: "POST",
      url: GET_SINGLE_SHOP_CATEGORY_API,
      data: { shopCategoryId },
      withCredentials: true,
    });

    console.log("single shop category", response);
    return response.data;
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("single shop category error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err);
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const removeShopCategory = async (data:any, token:string, dispatch:AppDispatch):Promise<ApiResponse<null>|null> => {
  dispatch(setUserLoading(true));
  let result = null;

  try {
    const response = await axios<ApiResponse<null>>({
      method: "DELETE",
      url: REMOVE_SHOP_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log("remove shop category", response);
      return response.data;
  } catch (err) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("remove shop category error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err)
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const toggleShopCategory = async (data:any, token:string, dispatch:AppDispatch):Promise<ApiResponse<ShopCategory>|null> => {
  dispatch(setUserLoading(true));

  try {
    const response = await axios<ApiResponse<ShopCategory>>({
      method: "PUT",
      url: TOGGLE_SHOP_CATEGORY_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log("toggle shop category", response);
      return response.data;
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("toggle shop category error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err)
    }
    return null;
  }
  finally{
     dispatch(setUserLoading(false));
  }
};

export const pickTags = async (data:any, dispatch:AppDispatch, token:string):Promise<ApiResponse<ShopCategory>|null> => {
  dispatch(setUserLoading(true));

  try {
    const response = await axios<ApiResponse<ShopCategory>>({
      method: "PUT",
      url: PICK_TAGS_API,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log("pick tag response", response);
      return response.data;
  } catch (err) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("pic tag api error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err)
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
};

export const removeTags = async (data:any, dispatch:AppDispatch, token:string):Promise<ApiResponse<ShopCategory>|null> => {
  dispatch(setUserLoading(true));

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

      console.log("remove tag response", response);
      return response.data;
  } catch (err:unknown) {
    if(axios.isAxiosError<{message:string}>(err)){
      console.log("remove tag error", err?.response?.data.message);
    }else{
      console.log("unexpected err",err)
    }
    return null;
  }
  finally{
    dispatch(setUserLoading(false));
  }
};





