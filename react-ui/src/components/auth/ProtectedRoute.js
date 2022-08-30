import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {});

  return <Component />;
};

export default ProtectedRoute;

/* Protected route code, based on Auth0 suggestions*/
//https://auth0.com/developers/hub/code-samples/spa/react-javascript/react-router-6-basic-authentication
