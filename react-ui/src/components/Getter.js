/* import "../styles/Home.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as request from "request";
import * as env from "./lib/env";

var getAccessToken = function (callback) {
  if (!env("AUTH0_DOMAIN")) {
    callback(
      new Error(
        "The AUTH0_DOMAIN is required in order to get an access token (verify your configuration)."
      )
    );
  }

  var options = {
    method: "POST",
    url: "https://" + env("AUTH0_DOMAIN") + "/oauth/token",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
    },
    body: {
      audience: env("RESOURCE_SERVER"),
      grant_type: "client_credentials",
      client_id: env("AUTH0_CLIENT_ID"),
      client_secret: env("AUTH0_CLIENT_SECRET"),
    },
    json: true,
  };

  request(options, function (err, res, body) {
    if (err || res.statusCode < 200 || res.statusCode >= 300) {
      return callback((res && res.body) || err);
    }

    callback(null, body.access_token);
  });
};

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Getter = () => {
  const [data, setData] = React.useState(null);
  const [text, setText] = React.useState(null);

  getAccessToken(function (err, accessToken) {
    if (err) {
      console.log(err);
      return;
    }

    // Call the Worldmappers API with the access token.
    var options = {
      url: "http://localhost:7001/api/directions?destination=Auth0%20Office",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    request.get(options, function (err, res, body) {
      if (err || res.statusCode < 200 || res.statusCode >= 300) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  });

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <p>{!text ? "Loading..." : text}</p>
      <button class="buttonProfile">Get Users</button>
    </div>
  );
};

export default Getter;
 */
