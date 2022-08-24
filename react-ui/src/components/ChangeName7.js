import Auth0Lock from "auth0-lock";
import { useEffect, useState } from "react";
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import "./../styles/ChangeName.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

var request = require("request");
var ManagementClient = require("auth0").ManagementClient;

var clientId = "6J2cpQGzD456WzodmDHXj4Kot4y84bgI";
var domain = "dev-7-8i89hb.us.auth0.com";
var lock = new Auth0Lock(clientId, domain);
var accessToken = null;
var profile = null;

const ChangeName = () => {
  const [newNickname, setNickname] = useState();

  lock.on("authenticated", function (authResult) {
    lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
      if (error) {
        // Handle error
        return;
      }

      accessToken = authResult.accessToken;
      profile = profileResult;

      // Update DOM
    });
  });

  var Auth = (function () {
    var wm = new WeakMap();
    var privateStore = {};
    var lock;

    function Auth() {
      this.lock = new Auth0Lock(clientId, domain);
      wm.set(privateStore, {
        appName: "example",
      });
    }

    Auth.prototype.getProfile = function () {
      return wm.get(privateStore).profile;
    };

    Auth.prototype.authn = function () {
      // Listening for the authenticated event
      this.lock.on("authenticated", function (authResult) {
        // Use the token in authResult to getUserInfo() and save it if necessary
        this.getUserInfo(authResult.accessToken, function (error, profile) {
          if (error) {
            // Handle error
            return;
          }

          //we recommend not storing Access Tokens unless absolutely necessary
          wm.set(privateStore, {
            accessToken: authResult.accessToken,
          });

          wm.set(privateStore, {
            profile: profile,
          });
        });
      });
    };
    return Auth;
  })();

  const handleSubmit = (e) => {
    e.preventDefault();

    setNickname(newNickname);

    setTimeout(function () {
      window.location.reload();
    }, 3);
  };

  /* redirectTo("/Profile"); */

  /*    addBuy({variables:{industry: input.value, offer_type: input.value, 
      offer_details: input.value, price: input.value, qualifications: input.value, 
      user_id: input.value, buy_offer_id:input.value }}) */

  return (
    <div id="container_Buy">
      <br></br>
      <h2 class="Headline">Current User Name is:</h2>
      <div id="nickName">
        <h2>
          <span id="nick" class="nickname">
            {profile.nickname}
          </span>{" "}
        </h2>
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
