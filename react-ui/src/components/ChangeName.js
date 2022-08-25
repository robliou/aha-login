import { useState } from "react";
import "./../styles/ChangeName.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

var request = require("request");
var ManagementClient = require("auth0").ManagementClient;
require("dotenv").config();

const ChangeName = () => {
  const { user } = useAuth0();

  const [newNickname, setNickname] = useState();

  var getAccessToken = function (callback) {
    if (!"dev-7-8i89hb.us.auth0.com") {
      callback(
        new Error(
          "The AUTH0_DOMAIN is required in order to get an access token (verify your configuration)."
        )
      );
    }

    var options = {
      method: "POST",
      url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
      headers: {
        "content-type": "application/json",
      },
      body: {
        audience: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
        client_id: `${process.env.clientId}`,
        client_secret: `${process.env.client_secret}`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getAccessToken(function (err, accessToken) {
      if (err) {
        console.log("Error getting a token:", err.message || err);
        return;
      }

      console.log("Posting nickname");

      var management = new ManagementClient({
        token: accessToken,

        domain: `${process.env.domain}`,
      });

      var params = { id: user.user_id };

      var data = { nickname: `'${newNickname}` };

      management.updateUser(params, data, function (err, user) {
        if (err) {
          console.log(err);
        }
        // Updated user.
      });

      localStorage.setItem("newNickname", newNickname);

      setTimeout(function () {
        window.location.reload();
      }, 3);
    });

    /*     alert(
      'Thank you for submitting the form. You can always examine or edit it under the tab "My Profile"'
    ); */
    /* redirectTo("/Profile"); */
  };

  let updatedNickname = localStorage.getItem("newNickname");

  return (
    <div id="container_Buy">
      <br></br>
      <h2 class="Headline">Current User Name is:</h2>
      <div id="nickName">
        <h2>{updatedNickname} </h2>
      </div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <ul class="flex-outer">
          <li>
            <label for="first-name">
              What would you like to change your new username to?
            </label>
            <input
              type="string"
              id="newNickname"
              name="newNickname"
              value={newNickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </li>
          <div id="buttons">
            <li>
              <button type="submit">Submit</button>
            </li>
          </div>
        </ul>
      </form>
      <br></br>
      <Link
        to={{
          pathname: `/profile`,
        }}
        id="homeButton"
      >
        <Button> Return to dashboard</Button>
      </Link>{" "}
    </div>
  );
};

export default ChangeName;
