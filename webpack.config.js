const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProduction = process.argv && process.argv.mode === 'production';

module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
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
    devServer: { contentBase: path.join(__dirname, "src") },
    performance: {
        hints: false,
        maxEntrypointSize: 2097152,
        maxAssetSize: 1048576
    },
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};
