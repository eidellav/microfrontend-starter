const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./webpack.config.common');
const Dotenv = require('dotenv-webpack');

const PORT = process.env.PORT || 4000;

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    hot: true,
    port: PORT,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public'),
    },
    client: {
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                transform: {
                  react: {
                    refresh: true,
                    runtime: 'automatic',
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new Dotenv({
      path: '.env.development',
      allowEmptyValues: true,
      systemvars: true,
    }),
    new Dotenv({
      path: '.env.local',
      allowEmptyValues: true,
      systemvars: true,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
