const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve("url"),
    fs: false,
    net: false,
    tls: false,
    "superagent-proxy": false,
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    zlib: require.resolve("browserify-zlib"),
    util: require.resolve("util"),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};

/*This file is necessary because I was getting an error allowing create-react-app to support .mjs files with webpack */
/*A suggestion presented at this GitHub comment was to add react-app-rewired to my
project and then use this config-overrides.js file to address the missing files:
https://stackoverflow.com/questions/64002604/how-to-make-create-react-app-support-mjs-files-with-webpack
The app runs OK with this solution.*/
