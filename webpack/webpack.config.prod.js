const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const ENV = process.env.NODE_ENV || 'production';

const prodConfig = {
  mode: 'production',
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: [/\.js?$/, /\.css$/],
      }),
    ],
  },
  plugins: [
    new Dotenv({
      path: `.env.${ENV}`,
      allowEmptyValues: true,
      systemvars: true,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
