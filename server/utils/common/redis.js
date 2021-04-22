/* eslint-disable global-require */

import logger from 'server-utils/common/logger';

let redis = null;

const onError = err => {
  logger.error(`Redis error`, err);
};

if (process.env.REDIS_MOCK === 'true' || process.env.PROJECT_UNDER_TEST || process.env.NODE_ENV === 'test') {
  redis = require('redis-mock').createClient();
} else if (process.env.REDIS_URL) {
  redis = require('redis').createClient(process.env.REDIS_URL);
  redis.on('error', onError);
} else {
  redis = require('redis').createClient();
  redis.on('error', onError);
}

module.exports = redis;
