import axios from "axios";
import API from "../../Services/API";

export const refreshToken = (token) => {
  return axios.post(API.REFRESH_TOKEN, {
    method: 'POST',
    body: {
      "refreshToken": token
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    }
  });
};

export const loginX = (data) => {
  return {
    type: 'LOGIN_SUCCESS',
    user: data,
  };
};
export const logoutX = () => {
  return {
    type: 'LOGIN_SUCCESS',
  };
};