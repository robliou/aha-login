import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/profileStyle.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { gql, useQuery } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
/* This line was needed for my bootstrap stuff to work. 
Adding it also fixed some .css issues in Chrome */

require("dotenv").config();

var ManagementClient = require("auth0").ManagementClient;
//ManagementClient utilizes the node-auth package to make calls to the Management API

/* User profile and Dashboard
Information obtained via calls to the Auth0 Management API via M2M token*/

/*  The purpose of this Dashboard component is to provide the User's profile information
as well as User Statistics. Note that for free accounts, Auth0 sets a limit on the number of calls 
that can be made per minute. Hence, some of the User Statistics information was moved to the 'usersOneDay' component, 
accessed through a Button click.The full requirements for this page are described here: 
https://docs.google.com/document/d/15tA1qlVOg14cmpX0DbIPPnUQa9GYlSXcb9haRCojVEU/edit.
 */

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [usersObject, setUsersObject] = useState();

  const [setVisible] = useState("false");

  var request = require("request");

  /* To access user metadata (i.e. nickname), I utilized a PostGresQL database hosted on ElephantQL.
It is accessed using GraphQL via ApolloQL/Hasura, which is a more elegant and easy-to-use solution compared to standard SQL.
Note that GraphQL is still based on the SQL database, and the data is hosted on an SQL database via ElephantSQL.
Below is the GRAPHQL query to access user metadata. 
Note that all queries/ mutations SHOULD be created from a GraphQL console.
 */
  const GET_NICKNAME = gql`
    query GetNickname($userEmail: String!) {
      names(where: { email: { _eq: $userEmail } }) {
        nickname
        email
      }
    }
  `;

  //The user's email address is accessed via the user object obtained from Auth0.
  const userEmail = user.email;

  /*   It is important to pay attention to the shape of the variable parameter in the UseMutation createHook.
  If the shape does not match what is defined in the GraphQL query, you will receive an 'undefined' error. */

  const { loading, error, data } = useQuery(GET_NICKNAME, {
    fetchPolicy: "cache-and-network",
    variables: { userEmail },
    onCompleted: () => {
      setVisible("true");
    },
  });

  if (loading) return "Submitting...";
  if (error) {
    alert("error");

    return `Submission error! ${error.message}`;
  }

  var getAccessToken = function (callback) {
    if (!"dev-7-8i89hb.us.auth0.com") {
      callback(
        new Error(
          "The AUTH0_DOMAIN is required in order to get an access token (verify your configuration)."
        )
      );
    }

    //Note that the POST call below is used to retrieve the Auth0 management API token
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

    var management = new ManagementClient({
      token: accessToken,

      domain: process.env.REACT_APP_DOMAIN,
    });

    var params = {
      search_engine: "v3",
      per_page: 30,
      page: 0,
    };

    //management.getUsers is used to retrieve users' data, using the Management API token obtained above
    management.getUsers(params, function (err, users) {
      if (err) {
        console.log(err);
      }
      setUsersObject(users);
    });
  });

  return isAuthenticated && data && userEmail ? (
    <div id="profileContainer">
      <div class="userInfo">
        <br></br>
        <div class="pageHeader">
          <h2>User Dashboard</h2>
        </div>
        <br></br>
        <br></br>
        <div class="titleHeader">
          <h4>My Profile Info</h4>
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
              <td>{data.names[0].nickname}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <br></br>
      <br></br>

      {usersObject ? (
        <div id="userStatistics">
          <div class="titleHeader">
            <br></br>
            <h4>Users Statistics</h4>
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
                  {/* -- Note that for free accounts, Auth0 sets a limit on the number of calls that can be made per minute*/}
                  {/* Hence, all 3 of the user stats information could not be retrieved at once, and moved
                  the remaining two to the 'usersOneDay' component*/}
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
          <br></br>
          <div class="titleHeader">
            <h4> Full User Sign-in Table </h4>
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
            {usersObject.map((data, idx) => (
              <tbody>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.created_at}</td>
                  <td>{data.logins_count}</td>
                  <td>{data.last_login}</td>
                </tr>
              </tbody>
            ))}
          </Table>
          <br></br>

          <div class="buttons">
            <Link
              to={{
                pathname: `/changeName`,
              }}
            >
              <Button id="changeName"> Change nickname</Button>
            </Link>
            {""}
            <Link
              to={{
                pathname: `/changePassword`,
              }}
            >
              <Button id="changePassword"> Change password</Button>
            </Link>
          </div>
          <br></br>
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
export default Dashboard;
