import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
//import { Loader } from "./loader";

//https://auth0.com/developers/hub/code-samples/spa/react-javascript/react-router-6-basic-authentication
//Protected Route redirect comes from link above:

export const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    //  onRedirecting: () {=> <Loader />},
  });

  return <Component />;
};

export default ProtectedRoute;
