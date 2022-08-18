import "./../styles/header.css";
import AuthNav from "./auth-nav";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

//below from https://auth0.com/docs/libraries/auth0-single-page-app-sdk#create-the-client

//

const Header = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  return isAuthenticated ? (
    <>
      <div id="profileContainer">
        <div id="ProfileButton">
          <ProfileButton className="ProfileButton" />
        </div>
        <div id="AuthNav">
          <AuthNav className="authNav" />
        </div>
      </div>
    </>
  ) : (
    <div id="profileContainer">
      <div id="AuthNav">
        <AuthNav className="authNav" />
      </div>
    </div>
  );
};

export default Header;
