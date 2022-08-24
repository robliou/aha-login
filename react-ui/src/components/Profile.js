import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
//This line was needed for my bootstrap stuff to work, for some strange reason
//It also fixed my .css stuff in Chrome?!?!?!?
const dayjs = require("dayjs");

require("dotenv").config({ path: "/.env" });

/* var env = require("./lib/env");
 */ var ManagementClient = require("auth0").ManagementClient;

/* import { response } from "express";
 */
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [usersObject, setUsersObject] = useState();

  var request = require("request");

  let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  console.log("This is yesterdayJs" + yesterday);

  console.log(yesterday);

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

    console.log("Getting User Statistics");

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
      console.log(users);
    });
  });

  return isAuthenticated ? (
    <div id="profileContainer">
      <div>
        <div id="userInfo">
          <br></br>
          <div id="pageHeader">
            <strong>User Dashboard</strong>
          </div>
          <br></br>
          <br></br>
          <div id="titleHeader">
            <strong>My Profile Info</strong>
          </div>
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
                <td>{user.nickname} </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      {usersObject ? (
        <div id="userStatistics">
          <div id="titleHeader">
            <strong>Users Statistics</strong>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
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
                <td>{usersObject.length} </td>
                <td>
                  <Link
                    to={{
                      pathname: `/usersOneDay`,
                    }}
                  >
                    <Button id="usersOneDay"> More stats</Button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/usersOneDay`,
                    }}
                  >
                    <Button id="usersOneDay"> More stats</Button>
                  </Link>{" "}
                </td>
              </tr>
            </tbody>
          </Table>
          <div id="titleHeader">
            <strong>Users Signed In</strong>
          </div>
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
              <tr>
                <td>{usersObject[3].name} </td>
                <td>{usersObject[3].created_at} </td>
                <td>{usersObject[3].logins_count} </td>
                <td>{usersObject[3].last_login} </td>
              </tr>
              <tr>
                <td>{usersObject[4].name} </td>
                <td>{usersObject[4].created_at} </td>
                <td>{usersObject[4].logins_count} </td>
                <td>{usersObject[4].last_login} </td>
              </tr>
            </tbody>
          </Table>
          <div id="buttons">
            <Link
              to={{
                pathname: `/changeName`,
              }}
            >
              <Button id="changeName"> Change nickname</Button>
            </Link>
            {"                "}
            <Link
              to={{
                pathname: `/changePassword`,
              }}
            >
              <Button id="changePassword"> Change password</Button>
            </Link>{" "}
          </div>
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
