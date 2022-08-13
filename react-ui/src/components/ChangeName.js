import { useState } from "react";
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import "./../styles/ChangeName.css";
//const axios = require('axios');
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ChangeName = () => {
  const [username, setUsername] = useState("");

  const [status, setStatus] = useState("");
  /* const [user_id, setUser_id] = useState('');
   */

  const { user } = useAuth0();
  let navigate = useNavigate();

  /*   const user_id = user.sub;
   */
  //const [body, setBody] = useState('');

  //const [values, handleChange] = UseForm({industry:"", offer_type:"", offer_details:"", price:"10", qualifications:"", user_id:"", buy_offer_id:""});
  //const values = {industry, offer_type, offzer_details, price, qualifications, user_id, buy_offer_id};

  const ADD_BUY_OFFER = gql`
    mutation MyMutation {
      update_users(where: { username: { _eq: "" } }) {
        affected_rows
        returning {
          username
        }
      }
    }
  `;

  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    /* setOffer_type(e); */
  };

  const [create_buy_offers, { data, loading, error }] = useMutation(
    ADD_BUY_OFFER,
    {
      variables: {
        object: {
          username: username,
          /*           user_id: user_id,
           */
        },
      },
    }
  );

  if (loading) return "Submitting...";
  if (error) {
    setStatus("error");

    return `Submission error! ${error.message}`;
  }

  function redirectTo(props) {
    navigate(`/${props}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    create_buy_offers({
      username,
      /*       user_id,
       */
    });
    alert(
      'Thank you for submitting the form. You can always examine or edit it under the tab "My Profile"'
    );
    redirectTo("Home");
  };

  /*    addBuy({variables:{industry: input.value, offer_type: input.value, 
      offer_details: input.value, price: input.value, qualifications: input.value, 
      user_id: input.value, buy_offer_id:input.value }}) */

  return (
    <div id="container_Buy">
      <h2 class="Headline">Current User Name is:</h2>
      <h2>{username} </h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <ul class="flex-outer">
          <li>
            <label for="first-name">
              What would you like to change your new username to?
            </label>
            <input
              type="string"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default ChangeName;
