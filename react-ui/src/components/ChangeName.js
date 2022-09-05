import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./../styles/changeName.css";

import { useAuth0 } from "@auth0/auth0-react";

import { gql, useMutation } from "@apollo/client";

const ChangeName = () => {
  const { user } = useAuth0();

  const [nickname, setNickname] = useState();

  const navigate = useNavigate();

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
      navigate("/Dashboard"); //will redirect to your blog page (an ex: blog.html)
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
