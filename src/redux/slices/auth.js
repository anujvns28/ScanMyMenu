import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
   authLoading : false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken : (state,action) =>{
        state.token = action.payload;
    },
    setUser : (state,action) =>{
        state.user = action.payload
    },
    setAuthLoading : (state,action) =>{
        state.authLoading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken,setAuthLoading,setUser } = authSlice.actions

export default authSlice.reducer