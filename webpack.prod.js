const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const {dependencies} = require("./package.json");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");



module.exports = merge(common, {
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: true // needed due to Patternfly CSS having some inconsistent style orderings
        }),
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new ModuleFederationPlugin({
            name: "apicurio-registry-mt-ui",
            remotes: {
                '@apicurio/registry': `apicurio_registry@/modules/registry/remoteEntry.js`,
            },
            shared: {
                ...dependencies,
                react: { singleton: true },
                "react-dom": { singleton: true } },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "node_modules/patternfly"),
                    path.resolve(__dirname, "node_modules/@patternfly/patternfly"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-core/dist/styles/base.css"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly"),
                    path.resolve(__dirname, "node_modules/@patternfly/react-styles/css")
                ],
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    output: {
        filename: "[name].bundle.[contenthash].js"
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
});
