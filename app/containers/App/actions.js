import {
  SET_LOGIN_REDIRECT,
  SET_USER,
  SET_USER_LOADING,
  SET_COOKIES_ALLOWED,
} from './constants';

const setUserLoading = () => {
  return {
    type: SET_USER_LOADING,
  };
};

const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

const setLoginRedirect = loginRedirect => {
  console.log(`setting the login redirect`);
  return {
    type: SET_LOGIN_REDIRECT,
    loginRedirect,
  };
};

const setCookiesAllowed = cookiesAllowed => {
  return {
    type: SET_COOKIES_ALLOWED,
    cookiesAllowed,
  };
};

module.exports = {
  setUserLoading,
  setUser,
  setLoginRedirect,
  setCookiesAllowed,
};
