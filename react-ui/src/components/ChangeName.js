import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./../styles/changeName.css";

import { useAuth0 } from "@auth0/auth0-react";

import { gql, useMutation } from "@apollo/client";

/*  The purpose of this component is to allow the user to change their nickname. 
The nickname is created as a metadata variable in a PostGresQL database hosted on ElephantQL.
We are using GraphQL via ApolloQL/ Hasura in order to access and update the database.
Note that while Auth0 provides the possibility of storing metadata for its users, I encountered
a CORS-related error that neither myself nor any of the Auth0 support team could solve.  
 */

const ChangeName = () => {
  const { user } = useAuth0();

  const [nickname, setNickname] = useState();

  const navigate = useNavigate();

  /*   This is the GraphQL mutation. 
Note that all queries/ mutations SHOULD be created from a GraphQL console.
 */
  const UPDATE_NICKNAME = gql`
    mutation UpdateNickname($nickname: String = "", $userEmail: String = "") {
      update_names(
        where: { email: { _eq: $userEmail } }
        _set: { nickname: $nickname }
      ) {
        returning {
          email
          nickname
        }
      }
    }
  `;

  const userEmail = user.email;

  /*   It is important to pay attention to the shape of the variable parameter in the UseMutation createHook.
  If the shape does not match what is defined in the GraphQL mutation, you will receive an 'undefined' error. */
  const [insert_nickname, { data, loading, error }] = useMutation(
    UPDATE_NICKNAME,
    {
      variables: {
        nickname: nickname,
        userEmail: userEmail,
      },
    }
  );

  if (loading) return "Submitting...";
  if (error) {
    alert("error");

    return `Submission error! ${error.message}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    insert_nickname({
      nickname,
    });
    console.log(data);
    alert(
      'Thank you for submitting the form. You can always examine or edit it under the tab "My Profile"'
    );
    setTimeout(function () {
      navigate("/Dashboard"); //will redirect to Dashboard; set a 1.5s timeout to allow variables to update
    }, 1500);
  };

  if (error) return `Error! ${error.message}`;
  else {
    return (
      <div id="container_Buy">
        <form onSubmit={handleSubmit}>
          <ul class="flex-outer">
            <li>
              <label for="first-name">
                What would you like to change your new nickname to?
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
  }
};

export default ChangeName;
