import { useEffect, useState } from "react";
import "./../styles/changeName.css";

import { useAuth0 } from "@auth0/auth0-react";

var request = require("request");

const axios = require("axios");

const ChangeName = () => {
  const [nickname, setNickname] = useState("null");

  let theNickname = axios.get("/names").then((res) => {
    console.log(res);
  });

  /*  function getNickname() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setNickname(data);
      });
  } */

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/names", {
        data: {
          nickname: nickname,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
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
      <h2>{nickname} </h2> <br></br>
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
