import { createSelector } from 'reselect';

const selectMonzo = state => state.get('monzo');

const makeSelectMonzoPots = () =>
  createSelector(
    selectMonzo,
    monzoState => monzoState.get('monzoPots'),
  );

const makeSelectPassword = () =>
  createSelector(
    selectMonzo,
    monzoState => monzoState.get('password'),
  );

const makeSelectMonzoLoading = () =>
  createSelector(
    selectMonzo,
    monzoState => monzoState.get('loading'),
  );

const makeSelectMonzoSuccess = () =>
  createSelector(
    selectMonzo,
    monzoState => monzoState.get('success'),
  );

const makeSelectMonzoError = () =>
  createSelector(
    selectMonzo,
    monzoState => monzoState.get('error'),
  );

export {
  makeSelectMonzoError,
  makeSelectMonzoLoading,
  makeSelectMonzoPots,
  makeSelectMonzoSuccess,
  makeSelectPassword,
  selectMonzo,
};
