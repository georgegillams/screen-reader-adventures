import { createSelector } from 'reselect';

const selectUserDetails = state => state.get('userDetails');

const makeSelectUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('userDetails'),
  );

const makeSelectUpdateingUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('updatingUserDetails'),
  );

const makeSelectUpdateUserDetailsSuccess = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('success'),
  );

const makeSelectUpdateUserDetailsError = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('error'),
  );

const makeSelectLoadingUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadingUserDetails'),
  );

const makeSelectLoadUserDetailsSuccess = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadSuccess'),
  );

const makeSelectLoadUserDetailsError = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadError'),
  );

export {
  selectUserDetails,
  makeSelectUserDetails,
  makeSelectUpdateingUserDetails,
  makeSelectUpdateUserDetailsSuccess,
  makeSelectUpdateUserDetailsError,
  makeSelectLoadingUserDetails,
  makeSelectLoadUserDetailsSuccess,
  makeSelectLoadUserDetailsError,
};
