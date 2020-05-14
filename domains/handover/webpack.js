const webpackConfig = require("../../webpack.js");

module.exports = {
  ...webpackConfig,
  entry: {
    "create-lambda": "./dist/create-lambda.js",
    "get-lambda": "./dist/get-lambda.js",
  },
  output: {
    filename: "[name]-bundle.js"
  }
};
