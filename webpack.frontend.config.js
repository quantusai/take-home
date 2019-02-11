const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Frontend Webpack Config
const webConfig = {
  mode: process.env.NODE_ENV || "development",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".json", ".ts", "tsx"]
  },
  target: "web",
  entry: "./src/web/index.tsx",
  output: {
    filename: "web.bundle.js",
    path: __dirname + "/dist"
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
      },
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

module.exports = webConfig;
