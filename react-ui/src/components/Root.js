import "../styles/Home.css";
import styles from "../styles/Home.css";

import React, { useEffect, useState } from "react";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Root = () => {
  const [userAddress, setUserAddress] = useState("");

  /*   useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]); */

  return (
    <div className="wrapper">
      <div id="banner">
        <h1 id="h1prop">
          <strong>
            {" "}
            Welcome to Rob's <br></br> Aha! Login Demo. <br></br>Please Login or
            Sign-up! <br />{" "}
          </strong>
        </h1>
      </div>
    </div>
  );
};

export default Root;
