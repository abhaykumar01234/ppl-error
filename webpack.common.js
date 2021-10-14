const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    alias: {
      '@arubaito': '@capterra/arubaito',
      '@tokens': '@capterra/arubaito/dist',
      '@ppl': path.resolve(__dirname, 'src/'),
      '@vp-components': '@capterra/vp-components'
    },
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, './src')],
        exclude: /\.module.s(c|a)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.module.s(c|a)ss$/,
        include: [path.resolve(__dirname, './src')],
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]_[local]__[hash:base64:5]'
              },
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({ path: `./.env.${process.env.NODE_ENV}` }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : 'ppl.min.css'
    })
  ]
};
