// TODO Move to client constants
const CHECK_FOR_NEW_CONTENT_INTERVAL = 1000;
const COMPONENT_RELOAD_INTERVAL = CHECK_FOR_NEW_CONTENT_INTERVAL / 2;
// TODO end

const { NODE_ENV, PROJECT_UNDER_TEST } = process.env;
// TODO Move to server code
const SESSION_SECRET =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? 'TEST'
    : process.env.SESSION_SECRET;
// TODO end

// TODO Move to db constants (inside dataManagement)
const REDIS_INFORMATION_STORES = [
  'analytics',
  'blogs',
  'comments',
  'emails',
  'notifications',
  'payments',
  'profiles',
  'stripepayments',
  'support',
  'userDetails',
  'users',
];
const REDIS_STORES = [
  ...REDIS_INFORMATION_STORES,
  'emailVerificationCodes',
  'magiclinks',
  'sessions',
];
// TODO end

const STRIPE_PUBLIC_API_KEY = process.env.STRIPE_PUBLIC_API_KEY
  ? process.env.STRIPE_PUBLIC_API_KEY
  : 'pk_test_cgQazYLEKCzNFGFuRfq0TL8N00Cj3LIfai';

export {
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMPONENT_RELOAD_INTERVAL,
  NODE_ENV,
  PROJECT_UNDER_TEST,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  SESSION_SECRET,
  STRIPE_PUBLIC_API_KEY,
};
export default {
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMPONENT_RELOAD_INTERVAL,
  NODE_ENV,
  PROJECT_UNDER_TEST,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  SESSION_SECRET,
  STRIPE_PUBLIC_API_KEY,
};
