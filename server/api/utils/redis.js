let redis = null;
if (process.env.NODE_ENV === 'test') {
  redis = require('redis-mock').createClient();
} else if (process.env.REDIS_URL) {
  redis = require('redis').createClient(process.env.REDIS_URL);
} else {
  redis = require('redis').createClient();
}

module.exports = redis;
