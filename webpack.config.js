const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./client/src/"),
  output: {
    path: path.resolve(__dirname, "./client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react", "env"],
            plugins: ["transform-object-rest-spread"]
          }
        },
        test: /\.js[x]?/,
        exclude: /node_modules/,
        
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};