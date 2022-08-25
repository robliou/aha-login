import "./../styles/header.css";
import AuthNav from "./Auth-nav";

import React from "react";

const Header = () => {
  return (
    <div id="wrapper">
      <br></br>
      <AuthNav className="authNav" />
    </div>
  );
};

export default Header;
