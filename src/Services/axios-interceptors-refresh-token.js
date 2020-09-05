import axios from 'axios';
import URL from './URL';
import { refreshToken } from '../Reducers/Actions/authAction';
import { useAuth } from '../Components/Routes/Context';

const { setAuthTokens } = useAuth();

let isRefreshing = false;
let subscribers = [];

function onRefreshed({ authorisationToken }) {
  subscribers.map(cb => cb(authorisationToken));
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

const setupAxiosInterceptors = (tokens) => {
  const request = axios.create({
    baseURL: URL
  });

  request.interceptors.response.use(null, err => {
    const {
      config,
      response: { status }
    } = err;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken(tokens).then(newTokens => {
          isRefreshing = false;
          onRefreshed(newTokens);
          setAuthTokens({accessToken: newTokens});
          subscribers = [];
        });
      }
      return new Promise(resolve => {
        subscribeTokenRefresh(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(err);
  });

  return request;
};

export default setupAxiosInterceptors;