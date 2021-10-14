const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackPrd = require('./webpack.prod');

module.exports = merge(webpackPrd, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 5000
    })
  ]
});
