import Auth0Lock from "auth0-lock";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./../styles/Profile.css";

require("dotenv").config();

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENTID,
  process.env.REACT_APP_CLIENT_SECRET
);
var accessToken = null;
var profile = null;

const ChangePassword = () => {
  lock.on("authenticated", function (authResult) {
    lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
      if (error) {
        // Handle error
        return;
      }

      accessToken = authResult.accessToken;
      profile = profileResult;

      // Update DOM
    });
  });

  lock.show();

  return (
    <div>
      <br></br>
      <h2 class="Headline">
        To change your password, click "Don't remember your password":
      </h2>
      <br></br>
      <Link
        to={{
          pathname: `/profile`,
        }}
        id="homeButton"
      >
        <Button> Return to dashboard</Button>
      </Link>{" "}
    </div>
  );
};

export default ChangePassword;
