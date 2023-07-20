var path = require("path");
var webpack = require("webpack");

module.exports = [
  {
    mode: "production",
    target: "web", // for browser
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
      },
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      library: "cosmjssdk",
      libraryTarget: "window",
      globalObject: "this",
    },
  },
  {
    mode: "production",
    target: "node", // for node
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "bundle-node.js",
      path: path.resolve(__dirname, "dist"),
      library: "cosmjssdk",
      libraryTarget: "commonjs2",
    },
  },
];
