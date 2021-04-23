import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import login from "../components/login";
import Dashboard from "../Views/Dashboard";
import ProtectedRoute from "../HOCS/ProtectedRoute";
import RequestTimeOff from "../Views/RequestTimeOff";

const MainRoutes = props => {
  return (
    <Switch>
      <Route path="/login" component={login} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path='/requesttimeoff' component={RequestTimeOff} />
      {/* <ProtectedRoute path="/onboarding" component={Onboarding} /> */}

      <Route path="/" component={login} />
    </Switch>
  );
};

export default MainRoutes;
