import { POST_LOGIN_REDIRECT_LOCATION_KEY, PRIVACY_PREFERENCES_KEY } from 'helpers/storageConstants';

const setPostLoginRedirect = location => {
  localStorage.setItem(POST_LOGIN_REDIRECT_LOCATION_KEY, location);
};

const redirectToCurrentPageAfterLogin = () => {
  const currentLocation = window.location;
  setPostLoginRedirect(currentLocation);
};

const clearPostLoginRedirect = () => {
  setInterval(() => {
    localStorage.removeItem(POST_LOGIN_REDIRECT_LOCATION_KEY);
  }, 2000);
};

const getPostLoginRedirect = () => {
  const result = localStorage.getItem(POST_LOGIN_REDIRECT_LOCATION_KEY);
  return result;
};

const getPostLoginRedirectAndRemove = () => {
  const result = getPostLoginRedirect();
  clearPostLoginRedirect();
  return result;
};

const setPrivacyPreferences = newValue => {
  localStorage.setItem(PRIVACY_PREFERENCES_KEY, newValue);
};

const getPrivacyPreferences = () => {
  return localStorage.getItem(PRIVACY_PREFERENCES_KEY);
};

export {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
  setPrivacyPreferences,
  getPrivacyPreferences,
};
export default {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
  setPrivacyPreferences,
  getPrivacyPreferences,
};
