import "./../styles/header.css";
import AuthNav from "./auth-nav";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

//below from https://auth0.com/docs/libraries/auth0-single-page-app-sdk#create-the-client

//

const Header = () => {
  const { loginWithRedirect } = useAuth0();

  const [userAddress, setUserAddress] = useState("");

  return (
    <>
      <ProfileButton className="ProfileButton" />

      <AuthNav className="authNav" />
    </>
  );
};

export default Header;
