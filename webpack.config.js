import path from "path";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {
  const mode = argv.mode || "development";

  return {
    mode: mode,
    entry: {
      index: "./src/js/index.js",
      login: "./src/js/login.js",
      register: "./src/js/register.js",
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        template: "./src/login.html",
        filename: "login.html",
        chunks: ["login"],
      }),
      new HtmlWebpackPlugin({
        template: "./src/register.html",
        filename: "register.html",
        chunks: ["register"],
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
    },
  };
};
