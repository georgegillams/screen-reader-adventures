/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const PAYMENT_TOKEN_CHANGED =
  'boilerplate/stripePayments/PAYMENT_TOKEN_CHANGED';
export const MAKE_PAYMENT = 'boilerplate/stripePayments/MAKE_PAYMENT';
export const MAKE_PAYMENT_SUCCESS =
  'boilerplate/stripePayments/MAKE_PAYMENT_SUCCESS';
export const MAKE_PAYMENT_ERROR =
  'boilerplate/stripePayments/MAKE_PAYMENT_ERROR';
