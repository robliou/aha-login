import { useState } from "react";
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import "./../styles/ChangeName.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

var request = require("request");
var ManagementClient = require("auth0").ManagementClient;

const ChangeName = () => {
  const [newNickname, setNickname] = useState("null");

  const { user } = useAuth0();

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
        client_id: "6J2cpQGzD456WzodmDHXj4Kot4y84bgI",
        client_secret:
          "fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F",
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

        domain: "dev-7-8i89hb.us.auth0.com",
      });

      var params = { id: user.user_id };
      /*      var metadata = {
        nickname: `'${newNickname}'`,
      }; */
      var data = { nickname: `'${newNickname}` };

      management.updateUser(params, data, function (err, user) {
        if (err) {
          console.log(err);
        }
        // Updated user.
      });
    });

    alert(
      'Thank you for submitting the form. You can always examine or edit it under the tab "My Profile"'
    );
    /* redirectTo("/Profile"); */
  };

  /*    addBuy({variables:{industry: input.value, offer_type: input.value, 
      offer_details: input.value, price: input.value, qualifications: input.value, 
      user_id: input.value, buy_offer_id:input.value }}) */

  return (
    <div id="container_Buy">
      <h2 class="Headline">Current User Name is:</h2>
      <div id="nickName">
        <h2>{user.nickname} </h2>
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
        </ul>
      </form>
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
