import "./../styles/authNavStyle.css";

import React from "react";
import AuthenticationButton from "./AuthenticationButton";

const AuthNav = () => (
  <div className="  ">
    <AuthenticationButton />
  </div>
);

export default AuthNav;

/* Component which contains Login/Logout button, as based on Auth0 suggestions*/
