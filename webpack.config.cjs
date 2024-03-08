const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: 'production',
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
                removeRedundantAttributes: false,
            },
        }),
        new Dotenv({
            systemvars: true,
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
            },
        ],
    },
};