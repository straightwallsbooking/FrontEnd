import { Button } from "@material-ui/core";
import React, { Component, useEffect } from "react";
// React router dom
import { Redirect, Route, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { makeGetRequest } from "../utils/request";

/*
A component which will redirect the user based on the checks
1) Authenticated
*/



const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setisAuthenticated] = React.useState(false)
  const [isRequesting, setisRequesting] = React.useState(true)
  // let isAuthenticated = true
  const history = useHistory()
  useEffect(() => {
    const makeCall = async () => {
      const res = await makeGetRequest("", "/auth/checklogin")
      if (res.status == 200) {
        setisAuthenticated(true)
      }
      setisRequesting(false)

    }
    makeCall()

  }, [])
  return (
    <Route
      {...rest}
      render={props =>
        !isRequesting && isAuthenticated ? (
          <>
           <Header />
            <Component {...props} />
          </>
        ) : !isRequesting ? (
          <Redirect to="/" />
        ) : <p>Wait</p>
      }
    />
  );
};
export default ProtectedRoute;
