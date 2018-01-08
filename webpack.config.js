const webpack = new require('webpack');
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const strip = require('strip-loader');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, './dist');
const __ENV__ = JSON.stringify('production');

const include = [
  path.resolve(__dirname, './src'),
];

const exclude = [
  path.resolve(__dirname, './node_modules')
];

const config = {
  devtool: 'source-map',
  context: path.join(__dirname, './'),
  entry: {
    index: './src/index.ts'
  },
  externals: [
    'autoprefixer',
    'path',
    'html-webpack-plugin',
    'extract-text-webpack-plugin',
    'webpack-md5-hash',
    'copy-webpack-plugin',
    'strip-loader',
    'easy-redux',
    'lodash',
    'moment',
    'superagent',
  ],
  node: {
    fs: "empty",
    fsevents: "empty"
  },
  output: {
    path: DIST_PATH,
    filename: 'index.js',
    libraryTarget: "umd",
    library: 'localCrud'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude,
        loaders: [strip.loader('debug'), 'babel-loader'],
        include,
      },
      {
        test: /\.ts$/,
        exclude,
        include,
        use: {
          loader: 'awesome-typescript-loader',
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({__ENV__}),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackMd5Hash(),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/main.d.ts',
        to: path.join(DIST_PATH, 'index.d.ts')
      },
    ])
  ]
};

module.exports = config;
