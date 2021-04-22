import appConfig from './appConfig';

const redirects = [
  {
    from: '/codebase',
    to: appConfig.githubRepoUrl,
  },

  { from: '/wp-admin', to: '/admin' },
  { from: '/site-map', to: '/sitemap' },
];

export default redirects;
