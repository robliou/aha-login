import "../styles/Home.css";
import React, { useState, useEffect, useContext } from "react";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Getter = () => {
  const [data, setData] = React.useState(null);
  const [text, setText] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <p>{!text ? "Loading..." : text}</p>
    </div>
  );
};

export default Getter;
