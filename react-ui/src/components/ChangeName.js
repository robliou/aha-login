import { useState } from "react";
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import "./../styles/ChangeName.css";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

var request = require("request");

const axios = require("axios");

const ChangeName = () => {
  const [nickname, setNickname] = useState("");

  let navigate = useNavigate();

  /*   const user_id = user.sub;
   */
  //const [body, setBody] = useState('');

  //const [values, handleChange] = UseForm({industry:"", offer_type:"", offer_details:"", price:"10", qualifications:"", user_id:"", buy_offer_id:""});
  //const values = {industry, offer_type, offzer_details, price, qualifications, user_id, buy_offer_id};

  const [accessToken, setAccessToken] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    /* setOffer_type(e); */
  };

  function redirectTo(props) {
    navigate(`/${props}`);
  }

  /*   const { getAccessTokenSilently } = useAuth0();
  const token = getAccessTokenSilently();
  console.log(token); */

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

  getAccessToken(function (err, accessToken) {
    if (err) {
      console.log("Error getting a token:", err.message || err);
      return;
    }
    console.log(accessToken);
    console.log(
      "Getting directions to the Auth0 Office from the World Mappers API"
    );
    setAccessToken(accessToken);

    /*     var management = new ManagementClient({
      token: accessToken,

      domain: "dev-7-8i89hb.us.auth0.com",
    });

    var params = {
      search_engine: "v3",
      per_page: 30,
      page: 0,
    };

    management.getUsers(params, function (err, users) {
      if (err) {
        console.log(err);
      }
      setUsersObject(users);
    }); */
  });

  var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/api/v2/users/{id}",
    headers: {
      authorization: accessToken,
      "content-type": "application/json",
    },
    data: {
      user_metadata: { username: nickname },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
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
      <h2>{nickname} </h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <ul class="flex-outer">
          <li>
            <label for="first-name">
              What would you like to change your new username to?
            </label>
            <input
              type="string"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default ChangeName;
