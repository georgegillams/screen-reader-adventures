require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title:
        'Screen Reader Adventures - learn to use a screen reader the fun way',
      description:
        'Screen Reader Adventures - learn to use a screen reader the fun way',
      head: {
        titleTemplate: 'Screen Reader Adventures: %s',
        meta: [
          {
            name: 'description',
            content: 'Learn to use a screen reader the fun way',
          },
          { charset: 'utf-8' },
          {
            property: 'og:site_name',
            content: 'Learn to use a screen reader the fun way',
          },
          {
            property: 'og:image',
            content: 'https://www.screen-reader-adventures.com/favicon.ico',
          },
          {
            property: 'og:logo',
            content: 'https://www.screen-reader-adventures.com/favicon.ico',
          },
          { property: 'og:locale', content: 'en_GB' },
          {
            property: 'og:title',
            content: 'Learn to use a screen reader the fun way',
          },
          {
            property: 'og:description',
            content:
              'Screen Reader Adventures - learn to use a screen reader the fun way',
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@georgegillams' },
          { property: 'og:creator', content: '@georgeillams' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
        ],
      },
    },
  },
  environment,
);
