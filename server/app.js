import { setConfig } from 'next/config';
import nextConfig from '../next.config';
import seo from './seo';
import applySecurityPractises from './security';
import api from './api/api';
import appConfig from 'helpers/appConfig';

const express = require('express');
const next = require('next');
const { Signale } = require('signale');
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import redirects from 'helpers/redirects';

setConfig(nextConfig);

const dev = !appConfig.isProduction;

const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

const options = {
  scope: 'app server',
};
const signale = new Signale(options);

(async () => {
  await app.prepare();
  const server = express();

  applySecurityPractises(server);

  // enable sending API requests with files in form-data
  server.use(fileupload());

  server.use(bodyParser.json());
  server.use(cookieParser());

  server.use(seo);
  server.use('/api', api);
  server.use('/static', express.static(dev ? 'public/static' : 'build/public/static'));

  redirects.forEach(redirect => {
    server.get(redirect.from, (req, res) => {
      res.redirect(redirect.to);
    });
  });

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  signale.success(`> ${appConfig.projectTitle} ready on http://localhost:${port}`);
})();
