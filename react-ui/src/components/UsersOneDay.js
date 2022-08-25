import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
//This line was needed for my bootstrap stuff to work, for some strange reason
//It also fixed my .css stuff in Chrome

const dayjs = require("dayjs");

require("dotenv").config();

let ManagementClient = require("auth0").ManagementClient;

const UsersOneDay = () => {
  const { user, isAuthenticated } = useAuth0();
  const [usersOneDay, setUsersOneDay] = useState(null);
  const [usersWeekAgo, setUsersWeekAgo] = useState(null);

  var request = require("request");

  let timeNow = dayjs().format("YYYY-MM-DD");

  let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  let oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

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
        client_id: process.env.REACT_APP_CLIENTID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
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

    console.log("Getting User Statistics");

    var management = new ManagementClient({
      token: accessToken,

      domain: "dev-7-8i89hb.us.auth0.com",
    });

    var paramsOneDay = {
      fields: "name",
      search_engine: "v3",
      q: `last_login:["${yesterday}" TO "${timeNow}"]`,
      per_page: 10,
      page: 0,
    };

    management.getUsers(paramsOneDay, function (err, users) {
      console.log(users.length);
      setUsersOneDay(users.length);
    });

    var paramsOneWeek = {
      fields: "name",
      search_engine: "v3",
      q: `last_login:["${oneWeekAgo}" TO "${timeNow}"]`,
      per_page: 10,
      page: 0,
    };

    management.getUsers(paramsOneWeek, function (err, users) {
      console.log(users.length);
      setUsersWeekAgo(users.length);
    });
  });

  return isAuthenticated ? (
    <div id="profileContainer">
      <div>
        <div id="userInfo">
          <img src={user.picture} alt={user.name} id="profilePic" />
          <br></br>
        </div>
      </div>

      <br></br>

      {isAuthenticated ? (
        <div id="showSellOffers">
          <div id="titleHeader">
            <strong>Users Statistics</strong>
          </div>
          <br></br>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th></th>
                <th># of Users with Active Sessions Today</th>
                <th>
                  Average number of active session users in the last 7 days-
                  rolling.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
                <td>{usersOneDay} </td>
                <td>{usersWeekAgo} </td>
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
export default UsersOneDay;
