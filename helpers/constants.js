const PROJECT_NAME = 'GEORGEGILLAMS';
const DECIMAL_REGEX = /^[0-9\.]*$/gi;
const INT_REGEX = /^[0-9]*$/gi;
const SORT_CODE_REGEX = /^[0-9\.-]*$/gi;
const STRING_REGEX = /^[A-Za-z0-9\.\ ]*$/gi;
const ID_REGEX = /^[A-Za-z0-9\-]*$/gi;
const USERNAME_REGEX = /^[A-Za-z0-9\.\ ]*$/gi;
const REDIRECT_REGEX = /^[A-Za-z0-9\.\ \-\_#\/]*$/gi;
const NAME_REGEX = /^[A-Za-z\ ]*$/gi;
const MONZOME_LINK_REGEX = /^(https?:\/\/)?monzo\.me\/[A-Za-z_-]+(\/.*)?$/gi;
const NON_EMOJI_REGEX = /[A-Za-zä\ 0-9,]*/gi;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi;
const PASSWORD_REGEX = /.{6,}/gi;
const MD_COMPLETE_REGEX = /.*/gi; // TODO UPDATE
const MD_PARTIAL_REGEX = /.*/gi; // TODO UPDATE
const CARD_NUMBER_REGEX = /.*/gi; // TODO UPDATE
const CVV_REGEX = /.*/gi; // TODO UPDATE
const EXPIRY_REGEX = /.*/gi; // TODO UPDATE
const DATE_REGEX = /.*/gi; // TODO UPDATE
const ANYTHING_REGEX = /.*/gi;
const TICKET_COST_EB_ONE_DAY = 2000;
const TICKET_COST_R_ONE_DAY = 2500;
const TICKET_COST_EB_TWO_DAY = 4500;
const TICKET_COST_R_TWO_DAY = 5000;
const TICKET_SALE_END = new Date(2019, 2, 20, 21, 0, 0).getTime();
const CONFERENCE_DAY_1_START = new Date(2019, 2, 23, 1, 0, 0).getTime();
const CONFERENCE_DAY_1_END = new Date(2019, 2, 23, 23, 0, 0).getTime();
const CONFERENCE_DAY_2_START = new Date(2019, 2, 24, 1, 0, 0).getTime();
const CONFERENCE_DAY_2_END = new Date(2019, 2, 24, 23, 0, 0).getTime();
const APP_VERSION = '4.0.0';
const TICKET_RESERVATION_LENGTH = 1; // 1 hour
const MONSTER_MOVING_SPEED = 0.4; // 1 hour
const COOKIE_NAMES = [
  'session',
  'version',
  'connect.sid',
  'io',
  'sessionId',
  'loggedInAdmin',
  'userComments',
];
const EMAIL_TAKEN = {
  error: 'invalid-request',
  errorMessage: 'Email already taken.',
};
const INVALID_SESSION = {
  error: 'auth',
  errorMessage:
    'Invalid session. Try clearing cookies for this site and then re-authenticate',
};
const INVALID_CREDENTIALS = {
  error: 'wrong-input',
  errorMessage: 'Error logging in. The credentials supplied are invalid.',
};
const UNAUTHORISED_READ = {
  error: 'auth',
  errorMessage: 'You are not authorised to read this resource',
};
const UNAUTHORISED_WRITE = {
  error: 'auth',
  errorMessage: 'You are not authorised to write to this resource',
};
const RESOURCE_NOT_FOUND = {
  error: 'not-found',
  errorMessage:
    "We looked everywhere but we couldn't find that resource. Maybe you need to sign in.",
};
const CHECK_FOR_NEW_CONTENT_INTERVAL = 1000;
const COMPONENT_RELOAD_INTERVAL = CHECK_FOR_NEW_CONTENT_INTERVAL / 2;
const EMAIL_VERIFICATION_ENABLED = true;
const GG_EMAIL = 'hello@georgegillams.co.uk';
const EMAIL_IMAGE_HTML =
  '<img src="https://i.imgur.com/h5zmNwn.png" style="width: 20rem;">';
const EMAIL_HTML_BUTTON_STYLE =
  'background-color: #e02626;padding: .9rem 1.2rem;color: white;border-radius: 2rem;text-decoration: none;';
const EMAIL_SENDER_EMAIL = GG_EMAIL;
const PROJECT_UNDER_TEST = process.env.PROJECT_UNDER_TEST;
const PORT = process.env.PORT || 3000;
const AWS = process.env.AWS === 'true';
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? 'TEST'
    : process.env.SESSION_SECRET;
const DOMAIN = 'screen-reader-adventures.com';
const SITE_URL =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? `http://localhost:${PORT}`
    : `https://www.${DOMAIN}`;
const API_ENDPOINT = `${SITE_URL}/api`;
const GENERIC_ERROR_MESSAGE = {
  type: 'error',
  message: 'Something went wrong. Please try again later.',
};
const COMMUNICATION_ERROR_MESSAGE = {
  type: 'error',
  message: 'Our servers are poorly. Please try again later.',
};
const STRIPE_PUBLIC_API_KEY = process.env.STRIPE_PUBLIC_API_KEY
  ? process.env.STRIPE_PUBLIC_API_KEY
  : 'pk_test_cgQazYLEKCzNFGFuRfq0TL8N00Cj3LIfai';
const STRIPE_SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;
const USERNAMES_ENABLED = PROJECT_NAME !== 'EPICC';
const REDIS_INFORMATION_STORES = [
  'analytics',
  'notifications',
  'payments',
  'stripepayments',
  'users',
];
const REDIS_STORES = [
  ...REDIS_INFORMATION_STORES,
  'emailVerificationCodes',
  'magiclinks',
  'sessions',
];

export {
  ANYTHING_REGEX,
  API_ENDPOINT,
  APP_VERSION,
  AWS,
  CARD_NUMBER_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMMUNICATION_ERROR_MESSAGE,
  COMPONENT_RELOAD_INTERVAL,
  CONFERENCE_DAY_1_END,
  CONFERENCE_DAY_1_START,
  CONFERENCE_DAY_2_END,
  CONFERENCE_DAY_2_START,
  COOKIE_NAMES,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  DOMAIN,
  EMAIL_HTML_BUTTON_STYLE,
  EMAIL_IMAGE_HTML,
  EMAIL_REGEX,
  EMAIL_SENDER_EMAIL,
  EMAIL_TAKEN,
  EMAIL_VERIFICATION_ENABLED,
  EXPIRY_REGEX,
  GENERIC_ERROR_MESSAGE,
  GG_EMAIL,
  ID_REGEX,
  INT_REGEX,
  INVALID_CREDENTIALS,
  INVALID_SESSION,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONSTER_MOVING_SPEED,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NODE_ENV,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  PORT,
  PROJECT_NAME,
  PROJECT_UNDER_TEST,
  REDIRECT_REGEX,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  RESOURCE_NOT_FOUND,
  SESSION_SECRET,
  SITE_URL,
  SORT_CODE_REGEX,
  STRING_REGEX,
  STRIPE_PUBLIC_API_KEY,
  STRIPE_SECRET_API_KEY,
  TICKET_COST_EB_ONE_DAY,
  TICKET_COST_EB_TWO_DAY,
  TICKET_COST_R_ONE_DAY,
  TICKET_COST_R_TWO_DAY,
  TICKET_RESERVATION_LENGTH,
  TICKET_SALE_END,
  USERNAME_REGEX,
  UNAUTHORISED_READ,
  UNAUTHORISED_WRITE,
  USERNAMES_ENABLED,
};
export default {
  ANYTHING_REGEX,
  API_ENDPOINT,
  APP_VERSION,
  AWS,
  CARD_NUMBER_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMMUNICATION_ERROR_MESSAGE,
  COMPONENT_RELOAD_INTERVAL,
  CONFERENCE_DAY_1_END,
  CONFERENCE_DAY_1_START,
  CONFERENCE_DAY_2_END,
  CONFERENCE_DAY_2_START,
  COOKIE_NAMES,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  DOMAIN,
  EMAIL_HTML_BUTTON_STYLE,
  EMAIL_IMAGE_HTML,
  EMAIL_REGEX,
  EMAIL_SENDER_EMAIL,
  EMAIL_TAKEN,
  EMAIL_VERIFICATION_ENABLED,
  EXPIRY_REGEX,
  GENERIC_ERROR_MESSAGE,
  GG_EMAIL,
  ID_REGEX,
  INT_REGEX,
  INVALID_CREDENTIALS,
  INVALID_SESSION,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONSTER_MOVING_SPEED,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NODE_ENV,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  PORT,
  PROJECT_NAME,
  PROJECT_UNDER_TEST,
  REDIRECT_REGEX,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  RESOURCE_NOT_FOUND,
  SESSION_SECRET,
  SITE_URL,
  SORT_CODE_REGEX,
  STRING_REGEX,
  STRIPE_PUBLIC_API_KEY,
  STRIPE_SECRET_API_KEY,
  TICKET_COST_EB_ONE_DAY,
  TICKET_COST_EB_TWO_DAY,
  TICKET_COST_R_ONE_DAY,
  TICKET_COST_R_TWO_DAY,
  TICKET_RESERVATION_LENGTH,
  TICKET_SALE_END,
  USERNAME_REGEX,
  UNAUTHORISED_READ,
  UNAUTHORISED_WRITE,
  USERNAMES_ENABLED,
};
