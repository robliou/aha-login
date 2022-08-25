import Auth0Lock from "auth0-lock";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./../styles/Profile.css";

require("dotenv").config();

var lock = new Auth0Lock(
  process.env.DOMAINCLIENTID,
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

  var Auth = (function () {
    var wm = new WeakMap();
    var privateStore = {};
    var lock;

    function Auth() {
      this.lock = new Auth0Lock(
        process.env.REACT_APP_CLIENTID,
        process.env.DOMAIN
      );
      wm.set(privateStore, {
        appName: "example",
      });
    }

    Auth.prototype.getProfile = function () {
      return wm.get(privateStore).profile;
    };

    Auth.prototype.authn = function () {
      // Listening for the authenticated event
      this.lock.on("authenticated", function (authResult) {
        // Use the token in authResult to getUserInfo() and save it if necessary
        this.getUserInfo(authResult.accessToken, function (error, profile) {
          if (error) {
            // Handle error
            return;
          }

          //we recommend not storing Access Tokens unless absolutely necessary
          wm.set(privateStore, {
            accessToken: authResult.accessToken,
          });

          wm.set(privateStore, {
            profile: profile,
          });
        });
      });
    };
    return Auth;
  })();

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
