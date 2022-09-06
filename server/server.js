const path = require("path");
const http = require("http");
const { expressjwt: jwt } = require("express-jwt");
const env = require("./lib/env");
const getPublicKey = require("./lib/getPublicKey");

require("dotenv").config();
/*
 * Initialize express.
 */
const express = require("express");
const app = express();

/* For full documentation and testing of these routes below, please see: 
   https://app.swaggerhub.com/apis/flashrob01/Aha-Login-API/1.0.0
 */

/*Relevant cors modules to deter cross-origin related errors*/
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors());

app.options("/*", cors(corsOptions));

/*  Middleware that will validate the incoming access token once it is received from Auth0. 
Not mandatory, but nice to have */
const jwtCheck = jwt({
  secret: getPublicKey("dev-7-8i89hb.us.auth0.com"),
  audience: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
  algorithms: ["RS256"],
  issuer: `https://dev-7-8i89hb.us.auth0.com/`,
});

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

/* these routes related to "/users" are used by the frontend to make calls to the "/users" path via the backend (Node)*/
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
/*

 * Start server.
 */
http.createServer(app).listen(env("PORT"), function () {
  console.log("listening on: http://localhost:" + env("PORT"));
});
