const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const isProduction = process.argv && process.argv.mode === 'production';

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: {
        app: path.join(__dirname, "src", "index.tsx")
    },
    plugins: [],
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
                test: /\.(tsx|ts)?$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 5000,
                        outputPath: "fonts",
                        outputPath: "svgs",
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
                            outputPath: "images",
                            name: isProduction ? '[contenthash:8].[ext]' : '[name].[ext]',
                        }
                    }
                ]
            },
        ],
    },
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
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "dist"),
        publicPath: "auto"
    },
    performance: {
        hints: false,
        maxEntrypointSize: 2097152,
        maxAssetSize: 1048576
    }
};
