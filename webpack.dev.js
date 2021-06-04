const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const {dependencies} = require("./package.json");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "7777";


function getRemoteEntryUrl(port) {
    return `//localhost:${port}/remoteEntry.js`;
}


module.exports = merge(common, {
    devtool: "eval-source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: "./src/favicon.ico"},
            ]}),
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new ModuleFederationPlugin({
            name: "apicurio-registry-mt-ui",
            remotes: {
                '@apicurio/registry': `apicurio_registry@${getRemoteEntryUrl(8888)}`,
            },
            shared: {
                ...dependencies,
                react: { singleton: true },
                "react-dom": { singleton: true } },
        }),
    ],
    devServer: {
        contentBase: "./dist",
        host: HOST,
        port: PORT,
        compress: true,
        inline: true,
        historyApiFallback: true,
        hot: true,
        overlay: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "node_modules/patternfly"),
                    path.resolve(__dirname, "node_modules/@patternfly/patternfly"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-styles/css"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-core/dist/styles/base.css"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly")
                ],
                use: ["style-loader", "css-loader"]
            }
        ]
    }
});
