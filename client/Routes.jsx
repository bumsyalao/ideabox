import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Auth from './components/User/Auth';
import Dashboard from './components/Dashboard';
import ViewIdea from './components/Ideas/ViewIdea';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import PageNotFound from './components/PageNotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/auth" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/view/:ideaId" component={ViewIdea} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/update-password/:hash" component={ResetPassword} />
    <Route component={PageNotFound} />
  </Switch>
  );

export default Routes;
