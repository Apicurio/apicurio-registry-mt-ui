const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const {dependencies} = require("./package.json");

const isProduction = process.argv && process.argv.mode === 'production';
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "7777";



function getRemoteEntryUrl(port) {
    return `//localhost:${port}/remoteEntry.js`;
}


module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        publicPath: "auto"
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json')
        })
      ],
      symlinks: false,
      cacheWithContext: false
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        host: HOST,
        port: PORT,
        inline: true,
        historyApiFallback: true,
        hot: true,
        overlay: true,
        open: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 2097152,
        maxAssetSize: 1048576
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: "bundle-loader",
                options: {
                    lazy: true,
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"],
            },
            {
              test: /\.(ttf|eot|woff|woff2)$/,
              use: {
                loader: 'file-loader',
                options: {
                  limit: 5000,
                  name: isProduction ? '[contenthash:8].[ext]' : '[name].[ext]',
                }
              }
            },
            {
              test: /\.(svg|jpg|jpeg|png|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 5000,
                    name: isProduction ? '[contenthash:8].[ext]' : '[name].[ext]',
                  }
                }
              ]
            },
        ],
    },
    plugins: [
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
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};
