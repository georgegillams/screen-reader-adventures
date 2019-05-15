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

export const USER_DETAILS_CHANGED =
  'boilerplate/userDetails/USER_DETAILS_CHANGED';
export const LOAD_USER_DETAILS = 'boilerplate/userDetails/LOAD_USER_DETAILS';
export const LOAD_USER_DETAILS_ERROR =
  'boilerplate/userDetails/LOAD_USER_DETAILS_ERROR';
export const LOAD_USER_DETAILS_SUCCESS =
  'boilerplate/userDetails/LOAD_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS =
  'boilerplate/userDetails/UPDATE_USER_DETAILS';
export const UPDATE_USER_DETAILS_ERROR =
  'boilerplate/userDetails/UPDATE_USER_DETAILS_ERROR';
export const UPDATE_USER_DETAILS_SUCCESS =
  'boilerplate/userDetails/UPDATE_USER_DETAILS_SUCCESS';
