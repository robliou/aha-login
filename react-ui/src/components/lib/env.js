var path = require("path");
var nconf = require("nconf");

nconf
  .env()
  .file({ file: path.join(__dirname, "../config.json") })
  .defaults({
    PORT: 5000,
  });

module.exports = function (key) {
  return nconf.get(key);
};
