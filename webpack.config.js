/**
 * Created by sandeepkumar on 08/09/17.
 */

const path = require('path');
const webpack = require('webpack');
const config = require('config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.NODE_ENV),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  ],
};

if (config.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    new UglifyJSPlugin()
  );
} else {
  webpackConfig.devtool = 'eval';
}


module.exports = webpackConfig;