const path = require("path");
const http = require("http");
const { expressjwt: jwt } = require("express-jwt");
const env = require("./lib/env");
const getPublicKey = require("./lib/getPublicKey");
const db = require("./names");

require("dotenv").config();
/*
 * Initialize express.
 */
const express = require("express");
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*
 * Middleware that will validate the incoming access token. 
   Probably not required, but nice to include here as long as it functions correctly.
 */
const jwtCheck = jwt({
  secret: getPublicKey("dev-7-8i89hb.us.auth0.com"),
  audience: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
  algorithms: ["RS256"],
  issuer: `https://dev-7-8i89hb.us.auth0.com/`,
});

app.use(cors());

app.options("/*", cors(corsOptions));

app.use("/api", jwtCheck, function (req, res, next) {
  if (req.user) {
    console.log(
      "Current user: " +
        req.user.sub +
        " (scope=" +
        (req.user.scope || "N/A") +
        ")"
    );
  }
  next();
});

/*
 * Error handler
 */
app.use(function (err, req, res, next) {
  if (err) {
    console.log("Unauthorized:", err.message);
    return res.status(401).send({ message: err.message });
  }

  next(err, req, res);
});

/* this route is used by the frontend to make calls to the "/users" path via the backend (Node)*/
app.get("/users", (req, res, next) => {
  console.log(res);
});

app.patch("/users", (req, res, next) => {
  console.log(res);
});

app.post("/users", (req, res, next) => {
  console.log(res);
});

/* prod */
app.use(express.static(path.join(__dirname, "../react-ui/build")));

/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-ui/build", "index.html"));
});

app.patch("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-ui/build", "index.html"));
}); */

/*
Routes related to changeName
*/
app.get("/names", db.getUsers);
app.get("/names/:email", db.getUserById);
app.post("/names", db.createUser);
app.put("/names/:email", db.updateUser);

/*
 * Start server.
 */
http.createServer(app).listen(env("PORT"), function () {
  console.log("listening on: http://localhost:" + env("PORT"));
});
