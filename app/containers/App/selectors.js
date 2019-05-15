import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectLoginRedirect = () => {
  console.log(`getting the login redirect`);
  return createSelector(
    selectGlobal,
    globalState => globalState.get('loginRedirect'),
  );
};

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectUserLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('userLoading'),
  );

const makeSelectCookiesAllowed = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('cookiesAllowed'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS(),
  );

module.exports = {
  makeSelectLoginRedirect,
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
};
