import "../styles/Home.css";
import React, { useState, useEffect, useCallback } from "react";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Fetcher = () => {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState("/api");

  const fetchData = useCallback(() => {
    fetch("http://localhost:3000/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        console.log(response.text);
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        setIsFetching(false);
      })
      .catch((e) => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      });
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        {process.env.NODE_ENV === "production" ? (
          <p>This is a production build from create-react-app.</p>
        ) : (
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        )}
        <p>
          {"« "}
          <strong>{isFetching ? "Fetching message from API" : message}</strong>
          {" »"}
        </p>
        <p>
          <a
            className="App-link"
            href="https://github.com/mars/heroku-cra-node"
          >
            React + Node deployment on Heroku
          </a>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
};

export default Fetcher;
