/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
// follow https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode  from 'jwt-decode';
import { message } from 'antd';
import Swal from 'sweetalert2';
import { useAuth } from './Context';
import { getRefreshToken } from '../App/action';

export const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const { authTokens, setAuthTokens } = useAuth();
  
  const cbNewAccessToken =(res) =>{
    // console.log(Date(Date.now()).toString());
    if(res){
      setAuthTokens({accessToken: res.accessToken,refreshToken: authTokens?.refreshToken, userData:authTokens?.userData,type: authTokens?.type});
      localStorage.setItem('tokens', JSON.stringify({accessToken: res.accessToken,refreshToken: authTokens?.refreshToken, userData:authTokens?.userData,type: authTokens?.type}));
    } else {
      setAuthTokens(false);
      localStorage.removeItem('tokens');
    }
  };
  const isAuthenticated = () => {
    const tokenX = JSON.parse(localStorage.getItem('tokens'));
      if(tokenX){
        const refreshTokenX = tokenX?.refreshToken;
        if (refreshTokenX && jwtDecode(refreshTokenX).exp > Date.now() / 1000) {
          getRefreshToken(refreshTokenX, cbNewAccessToken);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi rồi ...',
            text: 'Hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục',
          }).then(() => {
            setAuthTokens(false);
            localStorage.removeItem('tokens');
          });
        }
      }  
    };
  useEffect(() => {
    const autoRefreshToken = setInterval(()=>{
      isAuthenticated();
    },1000*60*20);
    return () => clearInterval(autoRefreshToken); 
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        return authTokens?.accessToken ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/welcome" />
        );
      }}
    />
  );
};
