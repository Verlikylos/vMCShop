import axios from '@admin/axios';
import { routes } from '@admin/config';

import { atom } from 'recoil';

export const authDataState = atom({
  key: 'authDataState',
  default: [],
});

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  return true;
};

export const checkToken = () => {
  const token = localStorage.getItem('token');

  return !!token && String(token) !== 'null' && String(token) !== 'undefined';
};

export const getToken = () => localStorage.getItem('token');

async function createLocalstorageItem(key, value) {
  localStorage.setItem(key, value);

  return true;
}

export function fetchToken() {
  const token = localStorage.getItem('token');

  if (new Date().getTime() > token.expiry) {
    logout();

    throw new Error('Token expired.');
  }
  if (!token) {
    throw new Error("Token doesn't exist.");
  }

  return { token: JSON.parse(token).token };
}

export const login = async (credentials = {}) =>
  new Promise((resolve, reject) => {
    logout();

    if (!credentials || !credentials.email || !credentials.password) {
      reject(new Error('Some fields are missing!'));
    }

    const data = {
      username: credentials.email,
      password: credentials.password,
    };

    axios
      .post(routes.login, data, { skipAuthRefresh: true })
      .then((response) => {
        if (response.status === 200) {
          createLocalstorageItem('token', response.data.token);
          createLocalstorageItem('refreshToken', response.data.refreshToken);
        }

        resolve(response);
      })
      .catch((error) => reject(error));
  });
