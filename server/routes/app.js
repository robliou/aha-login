const express = require("express");

const usersRouter = require("./users");
const bodyParser = require("body-parser");
const app = express();
const db = require("./users");
const cors = require("cors");

/* const port = 3000;
 */
app.options(
  "postgres://mcdyzqzn:tNZhAqSUXzbdvAGBM4QdN7kpQa-Rz3Js@john.db.elephantsql.com/mcdyzqzn",
  cors()
);
//app.options above worked to eliminate the CORS error!!! - https://stackoverflow.com/questions/67716707/cors-response-to-preflight-request-doesnt-pass-access-control-check-when-add-h

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
//This seems to have fixed the CORS issue - from the CORS book

app.use(cors(corsOptions));
//copied from sunshine-server==

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "application/x-www-form-urlencoded"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  /*  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', "application/x-www-form-urlencoded");
  res.header('Access-Control-Allow-Credentials', true); */
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users", db.getUsers);

/* app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); */

module.exports = app;
