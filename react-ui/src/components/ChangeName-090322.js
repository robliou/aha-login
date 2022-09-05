import { useEffect, useState } from "react";
import "./../styles/changeName.css";

import { useAuth0 } from "@auth0/auth0-react";

import { gql, useMutation } from "@apollo/client";

const ChangeName = () => {
  const { user, isAuthenticated } = useAuth0();

  const [nickname, setNickname] = useState("null");

  let userEmail = user.email;

  /*   setEmail(userEmail);
   */
  const UPDATE_NICKNAME = gql`
    mutation MyMutation {
      update_names(
        where: { email: { _eq: "robliou01@gmail.com" } }
        _set: { nickname: "rubby" }
      ) {
        returning {
          nickname
          email
        }
      }
    }
  `;

  const [update_name, { data, loading, error }] = useMutation(UPDATE_NICKNAME, {
    variables: {
      object: {
        nickname: nickname,
      },
    },
  });

  if (loading) return "Submitting...";
  if (error) {
    alert("error");

    return `Submission error! ${error.message}`;
  }

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    update_name({
      nickname,
    });

    alert(
      'Thank you for submitting the form. You can always examine or edit it under the tab "My Profile"'
    );
    /* redirectTo("/Profile"); */
  };

  if (!userEmail) return <p> Loading... </p>;
  else {
  }
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
