import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { notification } from 'antd';

import { isLoggedIn, authDataState, logout } from '@store/modules/auth';

import { PATH_PREFIX } from '@utils';

const LogoutPage = () => {
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const setAuthData = useSetRecoilState(authDataState);

  useEffect(() => {
    logout();
    setLoggedIn(false);
    setAuthData([]);

    notification.success({
      message: 'Wylogowano pomyślnie!',
      placement: 'topRight',
    });
  }, [setLoggedIn, setAuthData]);

  return <Redirect to={`${PATH_PREFIX}/login`} />;
};

export default LogoutPage;
