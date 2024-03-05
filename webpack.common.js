const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/assets/js/main.js',
        login: './src/assets/js/login.js',
        register: './src/assets/js/register.js',
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: './assets/js/[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: './src/login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: "register.html",
            template: './src/register.html',
            chunks: ['register'],
            minify: {
                removeRedundantAttributes: false, // Prevention remove type="text"
            }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                removeRedundantAttributes: false
            },
        ],
    },
}
