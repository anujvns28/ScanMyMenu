import { NavigateFunction } from "react-router-dom";
import { setAuthLoading, setToken, setUser } from "../../redux/slices/auth";
import type { User } from "../../types/user";
import { authEndPoints } from "../api";
import axios from "axios";
import { AppDispatch } from "../../redux/store";

const { LOGIN_API, SIGN_UP_API, LOGIN_WITH_TOKEN_API } = authEndPoints;

type ApiResponse = {
   message:string,
   success:boolean,
   token:string,
   user:User
}

type LoginData = {
  email:string,
  password:string
}

type SignupData = {
  name:string, 
  password:string,
  confirmPassword:string,
  cnfPassword:string,
  email:string
}



export const login = async (data:LoginData, navigate:NavigateFunction, dispatch:AppDispatch): Promise<void> => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios<ApiResponse>({
      method: "POST",
      url: LOGIN_API,
      data: data,
      withCredentials: true,
    });

    
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/shop");

  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
      console.log("Loign API ERROR............", err?.response?.data?.message);
    }
    else{
      console.log("Unexpected loign api Error:", err);
    }
  }
  finally{
    dispatch(setAuthLoading(false));
  }
};

export const signup = async (data:SignupData, dispatch:AppDispatch, navigate:NavigateFunction):Promise<void> => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios<ApiResponse>({
      method: "POST",
      url: SIGN_UP_API,
      data: data,
      withCredentials: true,
    });

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/shop");
  
  } catch (err:unknown) {
  if(axios.isAxiosError(err)){
    console.log("Signup APi Error", err?.response?.data?.message);
  }else{
    console.log("Unexpected Signup api Error:", err);
  }
  }
  finally{
    dispatch(setAuthLoading(false));
  }
};

export const loginWithToken = async (token:string, dispatch:AppDispatch):Promise<void> => {
  try {
    const response = await axios<ApiResponse>({
      method: "GET",
      url: LOGIN_WITH_TOKEN_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log(response)
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(token));
      dispatch(setUser(response.data.user));


  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
       console.log(err?.response?.data?.message, "this is login with token error");
    }else{
      console.log("Unexpected loign with token api Error:", err);
    }
  }
};
