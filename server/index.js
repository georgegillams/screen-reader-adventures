/* eslint consistent-return:0 */

import http from 'http';
import { resolve } from 'path';

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import SocketIo from 'socket.io';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import slowDown from 'express-slow-down';
import {
  DOMAIN,
  SESSION_SECRET,
  SITE_URL,
  PROJECT_UNDER_TEST,
} from 'helpers/constants';

import logger from './util//logger';
import seo from './seo';
import api from './api/api';
import greasemonkey from './greasemonkey';
import redirectNonWWW from './redirectNonWWW';
import argv from './util/argv';
import port from './util//port';
import setup from './middlewares/frontendMiddleware';

const app = express();
const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

// trust the first proxy, as this will be nginx forwarding requests to us.
app.set('trust proxy', 1);

// Rate limiting:
app.use(
  slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: 500, // begin adding 500ms of delay per request above 100:
    maxDelayMs: 20000, // begin adding 500ms of delay per request above 100:
    // request # 1 no delay
    // ...
    // request # 100 no delay
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // ...
    // request # 140 is delayed by 20s
    // request # 141 is delayed by 20s <-- won't exceed 20s delay
    skip: req => {
      if (req.originalUrl.includes('api')) {
        return false;
      }
      return true;
    },
  }),
);

if (process.env.NODE_ENV === 'production' && !PROJECT_UNDER_TEST) {
  app.use(helmet());
  app.use(
    cors({
      origin: SITE_URL,
    }),
  );
}

app.use(fileupload());

app.use(redirectNonWWW);
app.use(greasemonkey);
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, domain: DOMAIN, maxAge: 60000 },
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(seo);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);

// Add static projects (eg pecha kucha etc)
// app.use('/', express.static(__dirname + '/../public')); // ← adjust

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
