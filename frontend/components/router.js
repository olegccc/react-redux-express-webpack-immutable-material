import React from 'react';
import {Router, Route} from 'react-router';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import Home from './home';
import Record from './record';
import Navigation from './navigation';
import Layout from './layout';

const history = useRouterHistory(createHistory)({
    basename: '/'
});

const router = (
    <Router history={history}>
        <Route component={Layout}>
            <Route path="/" components={{main: Home, sidebar: Navigation}}/>
            <Route path="/record/:id" components={{main: Record, sidebar: Navigation}}/>
        </Route>
    </Router>);

export default router;