const path = require("path");

// Backend server Webpack Config
const serverConfig = {
  mode: process.env.NODE_ENV || "development",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".json", ".ts", "tsx"]
  },
  module: {
    rules: [
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    filename: "server.js",
    path: __dirname + "/dist"
  }
};

module.exports = serverConfig;
