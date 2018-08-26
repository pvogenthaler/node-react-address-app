const webpack = require('webpack');
const path = require('path');

const config = {
  entry: `${__dirname}/App.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      }
    ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  }
};

module.exports = config;
