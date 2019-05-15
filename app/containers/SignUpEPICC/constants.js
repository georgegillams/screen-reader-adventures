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

export const CREDENTIALS_CHANGED = 'boilerplate/signup/CREDENTIALS_CHANGED';
export const TICKET_SELECTION_CONFIRMED =
  'boilerplate/signup/TICKET_SELECTION_CONFIRMED';
export const TICKET_TYPE_CHANGED = 'boilerplate/signup/TICKET_TYPE_CHANGED';
export const SIGN_UP = 'boilerplate/signup/SIGN_UP';
export const SIGN_UP_ERROR = 'boilerplate/signup/SIGN_UP_ERROR';
export const SIGN_UP_SUCCESS = 'boilerplate/signup/SIGN_UP_SUCCESS';
