import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import AuthNav from "./auth-nav";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const onClick1 = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/auth/logout"}>
          {" "}
          <button> Logout </button>
        </Link>

        <AuthNav />

        <button onClick={onClick1}>Google Login</button>

        <button onClick={loginWithRedirect}>Auth0 Login</button>

        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>

        <script type="text/javascript" src="src/purify.js"></script>

        <h1 className="App-title">Login using...</h1>
        <p className="App-intro"></p>
        <a class="google-btn" href="/google">
          Google+
        </a>
      </header>
      <div className="App-body">)</div>
    </div>
  );
};

export default Login;
