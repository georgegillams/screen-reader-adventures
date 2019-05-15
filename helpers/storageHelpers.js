import moment from 'moment';

const POST_LOGIN_REDIRECT_LOCATION = 'post-login-redirect-location';

const redirectToCurrentPageAfterLogin = () => {
  const currentLocation = window.location;
  setPostLoginRedirect(currentLocation);
};

const setPostLoginRedirect = location => {
  localStorage.setItem(POST_LOGIN_REDIRECT_LOCATION, location);
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

export {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
};
export default {
  redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect,
  setPostLoginRedirect,
  getPostLoginRedirect,
  getPostLoginRedirectAndRemove,
};
