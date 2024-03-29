var ms = require("ms");
var request = require("request");

/* This file is required in order for the initial JWT inspection within server.js to work correctly. 
JWT inspection isn't mandatory, but it's nice security bonus to add.*/

function certToPEM(cert) {
  cert = cert.match(/.{1,64}/g).join("\n");
  cert = "-----BEGIN CERTIFICATE-----\n" + cert;
  cert = cert + "\n-----END CERTIFICATE-----\n";
  return cert;
}

function getPublicKeyFromJwks(domain, callback) {
  var options = {
    url: "https://" + domain + "/.well-known/.json",
    json: true,
  };

  request(options, function (err, res) {
    if (err || res.statusCode < 200 || res.statusCode >= 300) {
      return callback((res && res.body) || err);
    }

    var key = res.body.keys.find((key) => key.alg === "RS256");
    if (!key) {
      return callback(new Error("Unable to find public key for: " + domain));
    }

    return callback(null, certToPEM(key.x5c[0]));
  });
}

module.exports = function (domain) {
  if (!domain) {
    throw new Error("The domain is required in order to load the public key.");
  }

  var jwksError = null;
  var jwksPublicKey = null;

  // Fetch the public key every 10 hours to support key rotation.
  const getPublicKey = function () {
    getPublicKeyFromJwks(domain, function (err, publicKey) {
      if (err) {
        jwksError = err;
        console.log("Error loading public key for: " + domain, err);
      } else {
        jwksPublicKey = publicKey;
        console.log("Loaded public key for: " + domain);
      }
    });
  };
  getPublicKey();
  setInterval(getPublicKey, ms("10h"));

  // Function to return the public key.
  return function (req, header, payload, cb) {
    if (!jwksPublicKey) {
      return cb(err || new Error("Public key not available."));
    }

    return cb(null, jwksPublicKey);
  };
};
