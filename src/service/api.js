const BASE_URL = import.meta.env.VITE_BASE_URL;


export const authEndPoints = {
    SIGN_UP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}