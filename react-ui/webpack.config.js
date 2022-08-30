var webpack = require("webpack");

module.exports = {
  target: "node",
  test: /\.m?js/,
  resolve: {
    alias: {
      "superagent-proxy": false,
      fullySpecified: false,
    },
  },
  /* Below is for required for auth0-lock*/
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

/*This file is necessary in order to configure certain issues with the webpack configuration
Notably, the plugin above is required in order for the auth0-lock called in the ChangePassword.js module to perform correctly*/
