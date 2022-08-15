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

  var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"6J2cpQGzD456WzodmDHXj4Kot4y84bgI","client_secret":"fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F","audience":"https://dev-7-8i89hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const optionsM2M = {
    method: "GET",
    url: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer ACCESS_TOKEN",
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  const getUsersData = function () {
    axios
      .request(optionsM2M)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <p>{!text ? "Loading..." : text}</p>
      <button class="buttonProfile" onClick={() => getUsersData()}>
        Get Users
      </button>
    </div>
  );
};

export default Getter;
