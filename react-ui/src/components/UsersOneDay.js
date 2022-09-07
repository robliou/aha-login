import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/profileStyle.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
//This line was needed for bootstrap stuff to work
//It also fixed a .css issue in Chrome

const dayjs = require("dayjs");
//dayjs is useful for useful for standardizing date/time data into a readable format

require("dotenv").config();

/* -- Note that for free accounts, Auth0 sets a limit on the number of calls that can be made per minute.
Hence, all 3 pieces of the user stat information could not be retrieved and displayed at once.
Moved the remaining two to a table hosted within this component*/

let ManagementClient = require("auth0").ManagementClient;
/*ManagementClient is an Auth0 method that allows us to access the Management API via M2M token. 
Initialize it here.*/

const UsersOneDay = () => {
  const { isAuthenticated } = useAuth0();
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

  /*Here we call getAccessToken, which retrieves the M2M access token from Auth0. Immediately afterward, we also make 
  a query to the Management API to get additional users statistics. See below link for the API we call:
  https://auth0.com/docs/api/management/v2*/

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
        <div class="userInfo">
          <br></br>
        </div>
      </div>

      {isAuthenticated ? (
        <div class="showSellOffers">
          <div class="titleHeader">
            <br></br>
            <h2>Users Statistics (Additional) </h2>
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
          <br></br>
          <Link
            to={{
              pathname: `/dashboard`,
            }}
            id="homeButton"
          >
            <Button> Return to dashboard</Button>
          </Link>{" "}
          <br></br>
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
