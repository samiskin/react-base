// Based off of https://github.com/jerrysu/webpack-boilerplate/blob/master/webpack.config.dev.js
const isProduction = process.env.NODE_ENV === 'production';
module.exports = isProduction ? require('./webpack.config.production')
                              : require('./webpack.config.development');
