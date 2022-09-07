import "./../styles/root.css";
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

/* Note: Root is the home page for this App */

const Root = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="wrapper">
      <div id="banner">
        <h1 id="h1prop">
          <strong>
            {" "}
            Welcome to Rob's <br></br> Aha! Login Demo. :&#41; <br></br>Please
            Login or Sign-up. <br />{" "}
          </strong>
        </h1>
      </div>
      {isAuthenticated ? (
        <Link
          to={{
            pathname: `/dashboard`,
          }}
          id="homeButton"
        >
          <Button> Go to dashboard</Button>
        </Link>
      ) : (
        ""
      )}
      ;
    </div>
  );
};

export default Root;
