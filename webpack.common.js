const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const {dependencies} = require("./package.json");

module.exports = (mode) => {
    const isProduction = mode === "production";
    console.info("Is production build? %o", isProduction);
    return {
        mode,
        entry: {
            app: path.join(__dirname, "src", "index.tsx")
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {from: "./src/favicon.ico"},
                ]
            }),
            new NodePolyfillPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "index.html"),
            }),
            new ModuleFederationPlugin({
                name: "apicurio-registry-mt-ui",
                remotes: {
                    '@apicurio/registry': isProduction ?
                        `apicurio_registry@/modules/registry/apicurio_registry.js` :
                        `apicurio_registry@//localhost:8888/apicurio_registry.js`,
                },
                shared: {
                    ...dependencies,
                    react: {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies["react"],
                    },
                    "react-dom": {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies["react-dom"],
                    },
                    "react-router-dom": {
                        singleton: true,
                        requiredVersion: dependencies["react-router-dom"],
                    },
                },
            }),

        ],
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
    }
};
