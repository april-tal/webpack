const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const OpenBrowserPlugin =require('open-browser-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'js/bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env','babel-preset-react'],
            plugins: [
               ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }] 
             ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url:"http://localhost:3000/"
    })
  ]
};
