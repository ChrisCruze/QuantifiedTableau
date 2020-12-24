var path = require("path");
var hwp = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    filename: "src.js",
    path: __dirname
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            {
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: ["file-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    new webpack.DefinePlugin({
      "process.env.BROWSER": false,
      __DEV__: process.env.NODE_ENV !== "production"
    }),
    new hwp({ template: path.join(__dirname, "/src/index.html") })
  ]
};
