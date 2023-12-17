const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.[chunkhash].js',
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.css'],
    plugins: [new TsconfigPathsPlugin()],
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          limit: false,
        },
      },
      {
        test: /\.png/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new ModuleFederationPlugin({
      name: 'organic',
      library: { type: 'var', name: 'organic' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: true },
        'react-dom': { singleton: true, requiredVersion: false, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      inject: true,
      chunks: ['app'],
      publicPath: '/',
    }),
  ],
};
