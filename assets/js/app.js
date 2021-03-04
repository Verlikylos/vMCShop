import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ShopPage from '@app/pages/ShopPage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact>
        <ShopPage />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
