/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');

const webpack = require('webpack');
const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer');

process.noDeprecation = true;

const {
  NODE_ENV,
  BUILT_AT,
  STRIPE_PUBLIC_API_KEY,
  PROJECT_UNDER_TEST,
  PORT,
} = process.env;

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output,
  }, // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules\/(?!(bpk-|react-component-academic-reference)).*/,
        use: {
          loader: 'babel-loader',
          // specifying the configFile makes sure this works with components inside `node_modules`
          options: { configFile: './.babelrc' },
        },
      },
      {
        // Preprocess our own .scss files
        test: /\.scss$/,
        exclude: /node_modules\/(?!(bpk-|react-component-academic-reference)).*/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                gifsicle: {
                  interlaced: true,
                },
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        BUILT_AT: JSON.stringify(BUILT_AT),
        STRIPE_PUBLIC_API_KEY: JSON.stringify(STRIPE_PUBLIC_API_KEY),
        PROJECT_UNDER_TEST: JSON.stringify(PROJECT_UNDER_TEST),
        PORT: JSON.stringify(PORT),
      },
    }),
  ]),
  resolve: {
    modules: ['app', 'node_modules', 'server'],
    extensions: ['.js', '.jsx', '.scss', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
    },
  },
});
