import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NewsPage } from '@app/pages';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/">
                 <NewsPage />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root') ,
);
