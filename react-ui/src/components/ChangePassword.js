import Auth0Lock from "auth0-lock";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./../styles/profileStyle.css";

require("dotenv").config();

var accessToken = null;
var profile = null;

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENTID,
  process.env.REACT_APP_DOMAIN
);

/* Component to change password using Auth0 Lock*/

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
  /* lock is the Auth0 authorization widget */

  return (
    <div>
      <br></br>
      <h2 class="headline">
        To change your password, click "Don't remember your password":
      </h2>
      <br></br>
      <Link
        to={{
          pathname: `/dashboard`,
        }}
        id="homeButton"
      >
        <Button> Return to dashboard</Button>
      </Link>{" "}
    </div>
  );
};

export default ChangePassword;
