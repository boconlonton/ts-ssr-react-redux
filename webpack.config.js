const path = require("path");

module.exports = {
  entry: "./src/client/loaders/jobs-search.ts",
  output: {
    path: path.resolve(__dirname, "public/dist"), // Where the bundle will be placed
    filename: "bundle.js", // The name of the bundle file
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "src/client"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
