import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Auth from './components/User/Auth';
import Dashboard from './components/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/auth" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
  );

export default Routes;
