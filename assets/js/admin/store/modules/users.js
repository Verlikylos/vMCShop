import axios from '@admin/axios';
import { routes } from '@admin/config';
import { atom } from 'recoil';

export const usersState = atom({
  key: 'usersState',
  default: [],
});

export const userCountState = atom({
  key: 'userCountState',
  default: 0,
});

export const userDrawerState = atom({
  key: 'userDrawerState',
  default: false,
});

export const selectedUserIdState = atom({
  key: 'selectedUserIdState',
  default: null,
});

export const getUsers = (page = 1) =>
  new Promise((resolve, reject) => {
    axios
      .get(routes.users.pagination(page))
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getUser = (uuid) =>
  new Promise((resolve, reject) => {
    axios
      .get(routes.users.item(uuid))
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateUser = (uuid, data) => {
  const { name, email, avatar, roles } = data;

  return new Promise((resolve, reject) =>
    axios
      .put(routes.users.item(uuid), { name, email, avatar, roles })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  );
};

export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data || !data.name || !data.email) {
      reject(new Error('Some fields are missing!'));
    }

    axios
      .post(routes.users.collection, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
