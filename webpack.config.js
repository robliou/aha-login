const path = require("path");

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/entry",
  plugins: [new NodePolyfillPlugin()],
  output: {
    filename: "webpack-output.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: require.resolve("browserify-zlib"),
      http: false,
      https: false,
      stream: false,
      crypto: false,
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
};
