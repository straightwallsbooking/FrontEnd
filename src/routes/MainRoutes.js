import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import login from "../components/login";
import Dashboard from "../Views/Dashboard";
import ProtectedRoute from "../HOCS/ProtectedRoute";
import ManagerProtectedRoute from "../HOCS/ManagerProtectedRoute";
import RequestTimeOff from "../Views/RequestTimeOff";
import OutstandingRequests from "../Views/OutstandingRequests";
import ProcessTimeOffRequests from "../Views/ProcessTimeOffRequests";
import ProcessEmployeeTimeOffRequests from "../Views/ProcessEmployeeTimeOffRequests";
import ViewEmployeeStatusOnDate from "../Views/ViewEmployeeStatusOnDate";

const MainRoutes = props => {
  return (
    <Switch>
      <Route path="/login" component={login} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path='/requesttimeoff' component={RequestTimeOff} />
      <ProtectedRoute path='/outstandingrequests' component={OutstandingRequests} />
      <ManagerProtectedRoute path='/manageractions/processrequests' component={ProcessTimeOffRequests} />
      <ManagerProtectedRoute path='/manageractions/employee-requests' component={ProcessEmployeeTimeOffRequests} />
      
      <ManagerProtectedRoute path='/manageractions/date-employee-status' component={ViewEmployeeStatusOnDate} />
      
      {/* <ProtectedRoute path="/onboarding" component={Onboarding} /> */}

      <Route path="/" component={login} />
    </Switch>
  );
};

export default MainRoutes;
