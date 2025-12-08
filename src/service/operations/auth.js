import { authEndPoints } from "../api";
import axios from "axios"


const {
    LOGIN_API,
    SIGN_UP_API,
} = authEndPoints;

export const login = async(data) =>{
   try{
    const response = await axios({
        method:"POST",
        url:LOGIN_API,
        data:data,
        withCredentials:true
    })

    if(response){
        console.log(response,"this is login data");
    }
   }catch(err){
      console.log("login API ERROR............", err)
   }
}

export const signup = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: SIGN_UP_API,
      data: data,
      withCredentials: true,
    });

    if (response) {
      console.log(data, "this is signup response");
    }
  } catch (err) {
    console.log("Signup APi Error", err);
  }
};