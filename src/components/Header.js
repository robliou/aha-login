import "./../styles/header.css";
import AuthNav from "./auth-nav";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

import React, { useEffect, useState } from "react";

//below from https://auth0.com/docs/libraries/auth0-single-page-app-sdk#create-the-client

//

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button>Connect with MetaMask</button>
      </a>
    );
  }

  return (
    <button onClick={() => connect(setUserAddress)}>Connect to MetaMask</button>
  );
}

function Address({ userAddress }) {
  return (
    <span>
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
}

const Header = () => {
  const { loginWithRedirect } = useAuth0();

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  return (
    <>
      <Profile className="profile" />

      <AuthNav className="authNav" />
    </>
  );
};

export default Header;
