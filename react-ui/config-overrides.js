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
