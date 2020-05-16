const webpack = require("../../webpack.js");

module.exports = {
  ...webpack,
  entry: {
    "create-lambda": "./dist/create-lambda.js",
    "delete-lambda": "./dist/delete-lambda.js",
    "get-lambda":    "./dist/get-lambda.js",
    "update-lambda": "./dist/update-lambda.js",
  },
  output: {
    filename: "[name]-bundle.js", // ---> Output to ./dist
  },
};
