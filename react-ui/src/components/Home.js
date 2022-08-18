import "../styles/Home.css";
import { useState, useEffect, useContext } from "react";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Home = () => {
  let farm = "hello";

  return <div></div>;
};

export default Home;
