import "../styles/Home.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc
var request = require("request");

const Getter = () => {
  const [data, setData] = React.useState(null);
  const [text, setText] = React.useState(null);

  var AuthenticationClient = require("auth0").AuthenticationClient;

  var auth0 = new AuthenticationClient({
    domain: "https://dev-7-8i89hb.us.auth0.com",
    clientId: "6J2cpQGzD456WzodmDHXj4Kot4y84bgI",
    clientSecret:
      "fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F",
  });

  auth0.clientCredentialsGrant(
    {
      audience: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
      scope: "{read:users, update:users }",
    },
    function (err, response) {
      if (err) {
        // Handle error.
      }
      console.log(response.access_token);
    }
  );

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <p>{!text ? "Loading..." : text}</p>
      <button class="buttonProfile">Get Users</button>
    </div>
  );
};

export default Getter;
