const nextTranspileModules = require('next-transpile-modules');
const withImages = require('next-images');
const bundleAnalyzer = require('@next/bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const configureWebpack = (config, { dev }) => {
  const mCEPLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  };

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
  };

  config.module.rules.push({
    test: /\.css$/i,
    use: [mCEPLoader, cssLoader],
  });
  config.module.rules.push({
    test: /\.scss$/i,
    use: [mCEPLoader, cssLoader, 'sass-loader'],
  });
  config.module.rules.push({
    test: /\.(woff(2)?|ttf|eot)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          // Note these values are used to determine the URI that should be
          // used to resolve the file, not the desired output directory.
          // eg http://localhost:3000/static/fonts/quattrocento-sans-latin-700-normal_unused.woff2
          name: '[name].[ext]',
          outputPath: '/static/fonts',
          // This loader doesn't actually include the file in the build. That is done separately
          emitFile: false,
        },
      },
    ],
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: dev ? 'static/[name].css' : 'static/[name].[hash].css',
      chunkFilename: dev ? 'static/[id].css' : 'static/[id].[hash].css',
    })
  );
  return config;
};

const nextConfig = {
  distDir: 'build',
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'all',
    STARTED_AT: process.env.STARTED_AT,
  },
  env: {
    // NODE_ENV is handled automatically
    BUILT_AT: process.env.BUILT_AT,
    PORT: process.env.PORT,
    PROJECT_UNDER_TEST: process.env.PROJECT_UNDER_TEST,
    HOST: process.env.HOST,
  },
  webpack: configureWebpack,
};

const withTM = nextTranspileModules(['gg-components']);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

module.exports = withBundleAnalyzer(
  withImages(
    withTM({
      ...nextConfig,
    })
  )
);
