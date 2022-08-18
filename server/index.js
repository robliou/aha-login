const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
//This seems to have fixed the CORS issue - from the CORS book

//copied from sunshine-server==

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  app.use(cors(corsOptions));

  // Answer API requests.
  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get("*", function (req, res) {
    res.set("Content-Type", "application/json");
  });

  app.get("*", async (req, res) => {
    try {
      const { apiRoute } = req.params;
      const apiResponse = await fetch(
        "https://dev-7-8i89hb.us.auth0.com/api/v2/",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: '{"client_id":"6J2cpQGzD456WzodmDHXj4Kot4y84bgI","client_secret":"fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F","audience":"https://dev-7-8i89hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
        }
      );
      const apiResponseJson = await apiResponse.json();
      // await db.collection('collection').insertOne(apiResponseJson)
      console.log(apiResponseJson);
      res.send("Done – check console log");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  /*   app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });
 */
  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
