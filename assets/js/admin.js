import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Router, Switch, Route } from 'react-router-dom';

import history from '@admin/history';

import { DashboardPage, UsersPage, LoginPage, LogoutPage } from '@admin/pages';

import { PATH_PREFIX } from '@utils';

ReactDOM.render(
  <RecoilRoot>
    <Router history={history}>
      <Switch>
        <Route path={`${PATH_PREFIX}/`} exact>
          <DashboardPage />
        </Route>
        <Route path={`${PATH_PREFIX}/login`} exact>
          <LoginPage />
        </Route>
        <Route path={`${PATH_PREFIX}/logout`} exact>
          <LogoutPage />
        </Route>
        <Route path={`${PATH_PREFIX}/users`} exact>
          <UsersPage />
        </Route>
      </Switch>
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
);
