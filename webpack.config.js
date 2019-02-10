const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const commonConfig = {
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
  }
};

// Backend server Webpack Config
const serverConfig = {
  ...commonConfig,
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    filename: "server.js",
    path: __dirname + "/dist"
  }
};

// Fronend Webpack Config
const webConfig = {
  ...commonConfig,
  target: "web",
  entry: "./src/web/index.tsx",
  output: {
    filename: "web.bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      },
      {
        test: /\.(jpg|gif|png|svg|ico|icns)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/web/index.html")
    })
  ]
};

module.exports = [serverConfig, webConfig];
