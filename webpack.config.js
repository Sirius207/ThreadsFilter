const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    // Empty entry to avoid webpack errors
    main: "./src/background.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src", to: "." }],
    }),
  ],
  // Disable optimization since we're just copying files
  optimization: {
    minimize: false,
  },
  // Don't emit source maps
  devtool: false,
};
