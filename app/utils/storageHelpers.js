import moment from 'moment';

const POST_LOGIN_REDIRECT_LOCATION = 'post-login-redirect-location';
const USER_SELECTED_PLATFORM = 'user-selected-platform';
const SESSION_DEBUG_VIEWS = 'showSessionDebugViews';
const VO_KEY = 'user-selected-vo-key-key';
const TOUCH_BAR_KEY = 'user-selected-touch-bar-key';

const redirectToCurrentPageAfterLogin = () => {
  const currentLocation = window.location;
  setPostLoginRedirect(currentLocation);
};

const setPostLoginRedirect = location => {
  localStorage.setItem(POST_LOGIN_REDIRECT_LOCATION, location);
};

const setPlatform = selection => {
  localStorage.setItem(USER_SELECTED_PLATFORM, selection);
};

const setVOKey = selection => {
  localStorage.setItem(VO_KEY, selection);
};

const setTouchBar = selection => {
  localStorage.setItem(TOUCH_BAR_KEY, selection);
};

const getPlatform = () => {
  const result = localStorage.getItem(USER_SELECTED_PLATFORM);
  return result;
};

const getVOKey = () => {
  const result = localStorage.getItem(VO_KEY);
  return result;
};

const getTouchBar = () => {
  const result = localStorage.getItem(TOUCH_BAR_KEY);
  return result;
};

const clearPostLoginRedirect = () => {
  setInterval(() => {
    localStorage.removeItem(POST_LOGIN_REDIRECT_LOCATION);
  }, 2000);
};

const getPostLoginRedirect = () => {
  const result = localStorage.getItem(POST_LOGIN_REDIRECT_LOCATION);
  return result;
};

const getPostLoginRedirectAndRemove = () => {
  const result = getPostLoginRedirect();
  clearPostLoginRedirect();
  return result;
};

const setDebugViewsShown = newValue => {
  localStorage.setItem(SESSION_DEBUG_VIEWS, newValue);
};

const getDebugViewsShown = () =>
  window.localStorage.getItem(SESSION_DEBUG_VIEWS) === 'true';

export {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
  setPlatform,
  getPlatform,
  setVOKey,
  getVOKey,
  setTouchBar,
  getTouchBar,
  setDebugViewsShown,
  getDebugViewsShown,
};
export default {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
  setPlatform,
  getPlatform,
  setVOKey,
  getVOKey,
  setTouchBar,
  getTouchBar,
  setDebugViewsShown,
  getDebugViewsShown,
};
