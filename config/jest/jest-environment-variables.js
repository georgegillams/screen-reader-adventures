// Set up common env variables used for testing
process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
  SECRET_API_KEY: 'secret_api_key',
});
