import axios from "axios";
/* import request from "request";
 */ import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import API from "./API";
/* import { response } from "express";
 */
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [data, setData] = useState(null);

  const [visible, setVisible] = useState("false");

  var request = require("request");

  var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"6J2cpQGzD456WzodmDHXj4Kot4y84bgI","client_secret":"fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F","audience":"https://dev-7-8i89hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const optionsM2M = {
    method: "GET",
    url: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer ACCESS_TOKEN",
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  }).then(
    axios
      .request(optionsM2M)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      })
  );
  //above sort of works

  /*  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  }).then(
    fetch("https://dev-7-8i89hb.us.auth0.com/api/v2/")
      .then((res) => res.json())
      .then((data) => setData(data.message))
  ); */

  /*   const fetchUser = () => {
    axios
      .request(optionsM2M)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  /* axios
    .request(optionsM2M)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    }); */

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
