import axios from "axios";
/* import request from "request";
 */ import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { Table } from "react-bootstrap";

require("dotenv").config({ path: "/.env" });

/* var env = require("./lib/env");
 */ var ManagementClient = require("auth0").ManagementClient;

/* import { response } from "express";
 */
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [data, setData] = useState(null);

  const [visible, setVisible] = useState("false");
  var request = require("request");

  console.log(process.env);

  /*   var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: '{"client_id":"6J2cpQGzD456WzodmDHXj4Kot4y84bgI","client_secret":"fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F","audience":"https://dev-7-8i89hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  }; */

  /*   const optionsM2M = {
    method: "GET",
    url: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer ACCESS_TOKEN",
      "Access-Control-Allow-Origin": "*",
    },
  }; */

  /*   request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
 */
  /*   const getUsersData = function () {
    axios
      .request(optionsM2M)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }; */

  var getAccessToken = function (callback) {
    if (!process.env.REACT_APP_AUTH0_DOMAIN) {
      callback(
        new Error(
          "The AUTH0_DOMAIN is required in order to get an access token (verify your configuration)."
        )
      );
    }

    var options = {
      method: "POST",
      url: "https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/oauth/token",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json",
      },
      body: {
        audience: process.env.REACT_APP_RESOURCE_SERVER,
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
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

    var management = new ManagementClient({
      token: accessToken,
      domain: process.env.AUTH0_DOMAIN,
    });

    var params = {
      search_engine: "v3",
      per_page: 10,
      page: 0,
    };

    management.getUsers(params, function (err, users) {
      if (err) {
        console.log(err);
      }
      console.log(users);
    });
  });

  return isAuthenticated ? (
    <div id="profileContainer">
      <div>
        <div id="userInfo">
          <img src={user.picture} alt={user.name} id="profilePic" />
          <br></br>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>{user.sub} </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <br></br>

      <button class="buttonProfile">Get Users</button>

      {visible === "true" ? (
        <div id="showSellOffers">
          Users info
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Headline</th>
                <th>Offer details</th>
                <th>Offer type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
};
export default Profile;

/* ApolloTableQL
  query={UsersQuery}
  columns={['first_name', 'last_name','user_id', 'created_at' ]}
   /> */

//Having weird issue when trying to fetch from more than one database. For now, just fetch from one database until further notice...
