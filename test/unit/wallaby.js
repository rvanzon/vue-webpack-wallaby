var merge = require('webpack-merge')
var baseConfig = require('../../build/webpack.base.conf')
var utils = require('../../build/utils')
var webpack = require('webpack')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    loaders: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  vue: {
    loaders: {
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      { pattern: '../../src/**', load: false },
    ],

    // testFramework: 'mocha',

    tests: [
      { pattern: 'specs/*spec.js', load: false }
    ],

    postprocessor: wallabyPostprocessor,

    compilers: {
      '**/*.js': wallaby.compilers.babel({ babel: require('babel-core') })
    },

    testFramework: 'mocha',

    bootstrap: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
