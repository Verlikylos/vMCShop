import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import history from '@admin/history';
import { API_URL } from '@admin/config';
import { PATH_PREFIX } from '@utils';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

// Obtain the fresh token each time the function is called
const getToken = () => localStorage.getItem('token');

const getRefreshToken = () => localStorage.getItem('refreshToken');

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  instance
    .post(`${API_URL}/token/refresh`, { refreshToken: getRefreshToken() })
    .then((tokenRefreshResponse) => {
      if (tokenRefreshResponse.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push(`${PATH_PREFIX}/login`);
        return;
      }
      localStorage.setItem('token', tokenRefreshResponse.data.token);
      localStorage.setItem('refreshToken', tokenRefreshResponse.data.refreshToken);

      failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.token}`;

      return Promise.resolve();
    })
    .catch((error) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      history.push(`${PATH_PREFIX}/login`);
      return Promise.reject(error);
    });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);

// Use interceptor to inject the token to requests
instance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getToken()}`;

  return request;
});

export default instance;
