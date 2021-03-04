export const API_URL = process.env.REACT_APP_SERVER_URL || 'http://vmcshop.test/api';

export const routes = {
  login: '/login',
  refreshToken: '/token/refresh',

  users: {
    pagination: (page = 1) => `/users?page=${page}`,
    collection: `/users`,
    item: (uuid) => `/users/${uuid}`,
  },
};
