/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

if (!process.env.REGISTRY_MT_CONFIG) {
  console.info("");
  console.info("=======================================================================");
  console.info("Using default 'local' configuration for running on localhost.");
  console.info("You can configure a profile using the REGISTRY_MT_CONFIG env var.");
  console.info("Example:  'export REGISTRY_MT_CONFIG=operate-first'");
  console.info("=======================================================================");
  console.info("");
}

const CONFIG = process.env.REGISTRY_MT_CONFIG || "local";
console.info("Using Registry MT config: ", CONFIG);
const devServerConfigFile = `./configs/${CONFIG}/devServer.json`;
const devServerConfig = require(devServerConfigFile);

let filesToCopy = [
  { from: `./configs/${CONFIG}/config.js`, to: "config.js"}
];

if (devServerConfig.keycloak) {
  filesToCopy.push(
      { from: "./src/keycloak.dev.json", to: "keycloak.json"}
  );
}

if (devServerConfig.warning) {
  console.info("");
  console.info("====================================================================");
  console.info(devServerConfig.warning);
  console.info("====================================================================");
  console.info("");
}

module.exports = merge(common("development"), {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: "./dist",
    },
    host: devServerConfig.host,
    port: devServerConfig.port,
    compress: true,
    //inline: true,
    historyApiFallback: true,
    allowedHosts: "all",
    hot: true,
    client: {
      overlay: true,
    },
    open: true,
    https: devServerConfig.protocol === "https",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: filesToCopy
    })
  ]
});
