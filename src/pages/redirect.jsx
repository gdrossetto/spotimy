import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../services/user.service";
import { getAccessToken, getParamValues } from "../util";

const RedirectPage = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();

  async function getUser(){
      const userData = await getUserInfo();
      dispatch({type:'SET_USER', user: userData})
  }

  useEffect(() => {
    if(window.location.hash){
      const access_token = getParamValues(window.location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem("params", JSON.stringify(access_token));
      localStorage.setItem("expiry_time", expiryTime);
      getUser();
      history.push('/')
    }else{
      history.push('/login')
    }
    
  }, []);

  return (
    <div>
      <h1>Logging in ...</h1>
    </div>
  );
};
export default RedirectPage;
