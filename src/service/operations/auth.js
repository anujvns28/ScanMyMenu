import { setAuthLoading, setToken, setUser } from "../../redux/slices/auth";
import { authEndPoints } from "../api";
import axios from "axios";

const { LOGIN_API, SIGN_UP_API, LOGIN_WITH_TOKEN_API } = authEndPoints;

export const login = async (data, navigate, dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: LOGIN_API,
      data: data,
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/shop");
    }
  } catch (err) {
    console.log("login API ERROR............", err);
  }
  dispatch(setAuthLoading(false));
};

export const signup = async (data, dispatch, navigate) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: SIGN_UP_API,
      data: data,
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/shop");
    }
  } catch (err) {
    console.log("Signup APi Error", err);
  }
  dispatch(setAuthLoading(false));
};

export const loginWithToken = async (token, dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: LOGIN_WITH_TOKEN_API,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setToken(token));
      dispatch(setUser(response.data.user));

    }
  } catch (err) {
    console.log(err, "this is login with token error");
  }
};
