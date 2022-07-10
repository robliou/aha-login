
import '../styles/Home.css';
import styles from '../styles/Home.css';



import React, { useEffect, useState } from "react";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
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
         <button className={styles.button}>
           Connect to MetaMask
         </button>
      </a>
    );
  }

  
  return (
    <button  className={styles.button}onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}



const Root = () => {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

/*   useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]); */



 
  
  
  
  

    return (

      
     
        <div className="wrapper">

<div id="banner">
        <h1 id="h1prop"> 
          <strong>  Welcome to Rob's <br></br> RCT Login Demo. <br></br>Please Login or Sign-up! <br /> </strong>
              
        </h1>    

        
                </div>

                  

    
               
                  
           
   

        
    </div>    
    )
}

export default Root;
