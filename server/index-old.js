var express = require("express");
var app = express();
var jwt2 = require("express-jwt");
var jwks = require("jwks-rsa");

var port = process.env.PORT || 5000;

var jwtCheck = jwt2({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-7-8i89hb.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://aha-login.herokuapp.com",
  issuer: "https://dev-7-8i89hb.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(port);
