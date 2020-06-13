require('babel-polyfill');

const { NODE_ENV, PROJECT_UNDER_TEST, PORT } = process.env;

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[NODE_ENV || 'development'];

const projectName = 'SCREEN_READER_ADVENTURES';
const domain = 'screen-reader-adventures.com';
const port = PORT || 3000;
const siteUrl =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? `http://localhost:${port}`
    : `https://www.${domain}`;
const apiEndpoint = `${siteUrl}/api`;

module.exports = {
  host: process.env.HOST || 'localhost',
  port,
  projectName,
  domain,
  siteUrl,
  apiEndpoint,
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
  ...environment,
};
