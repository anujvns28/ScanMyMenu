import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { loginWithToken } from '../service/operations/auth';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
    const {search} = useLocation();
    const dispatch = useDispatch();
    const query = new URLSearchParams(search);
    const token = query.get("token");

    const loginWithTokeHealper = async() =>{
       await loginWithToken(token,dispatch);
    }

    useEffect(()=>{
        if(token){
            loginWithTokeHealper();
        }
    },[])
  return (
    <div>

    </div>
  )
}

export default Dashboard
