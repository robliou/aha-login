import "./../styles/header.css";
import AuthNav from "./auth-nav";

import React from "react";

//below from https://auth0.com/docs/libraries/auth0-single-page-app-sdk#create-the-client

//

const Header = () => {
  return (
    <div id="wrapper">
      <br></br>
      <AuthNav className="authNav" />
    </div>
  );
};

export default Header;
