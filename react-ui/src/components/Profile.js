import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { Table } from "react-bootstrap";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
//This line was needed for my bootstrap stuff to work, for some strange reason
//It also fixed my .css stuff in Chrome?!?!?!?

require("dotenv").config({ path: "/.env" });

/* var env = require("./lib/env");
 */ var ManagementClient = require("auth0").ManagementClient;

/* import { response } from "express";
 */
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [usersObject, setUsersObject] = useState();

  const [visible, setVisible] = useState("false");

  var request = require("request");

  /*   var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"6J2cpQGzD456WzodmDHXj4Kot4y84bgI","client_secret":"fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F","audience":"https://dev-7-8i89hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  }); */

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

    var management = new ManagementClient({
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
    });
  });

  console.log(usersObject);

  return isAuthenticated ? (
    <div id="profileContainer">
      <div>
        <div id="userInfo">
          <img src={user.picture} alt={user.name} id="profilePic" />
          <br></br>
          <strong>My Profile Info</strong>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User ID</th>
                <th>Nickname</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>{user.sub} </td>
                <td>{user.sub} </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <br></br>

      {usersObject ? (
        <div id="showSellOffers">
          <strong>Users Signed In</strong>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Timestamp of user sign up</th>
                <th># of Times Logged In</th>
                <th>Timestamp of last user session</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usersObject[0].nickname} </td>

                <td>{usersObject[0].name} </td>
                <td>{usersObject[0].created_at} </td>
                <td>{usersObject[0].logins_count} </td>
                <td>{usersObject[0].last_login} </td>
              </tr>
              <tr>
                <td>{usersObject[1].name} </td>
                <td>{usersObject[1].created_at} </td>
                <td>{usersObject[1].logins_count} </td>
                <td>{usersObject[1].last_login} </td>
              </tr>
              <tr>
                <td>{usersObject[2].name} </td>
                <td>{usersObject[2].created_at} </td>
                <td>{usersObject[2].logins_count} </td>
                <td>{usersObject[2].last_login} </td>
              </tr>
            </tbody>
          </Table>

          <strong>Users Signed In</strong>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Statistics</th>
                <th># of Users Signed Up</th>
                <th># of Users with Active Sessions Today</th>
                <th>
                  Average number of active session users in the last 7 days
                  rolling.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
                <td>{usersObject.length} </td>
                <td> </td>
                <td>{usersObject[0].last_login} </td>
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
