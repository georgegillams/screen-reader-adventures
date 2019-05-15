import { createSelector } from 'reselect';

const selectPC = state => state.get('pc');

const makeSelectPC = () =>
  createSelector(
    selectPC,
    pcState => pcState && pcState.get('pc'),
  );

const makeSelectLoadingPC = () =>
  createSelector(
    selectPC,
    pcState => pcState && pcState.get('loadingPC'),
  );

const makeSelectLoadPCSuccess = () =>
  createSelector(
    selectPC,
    pcState => pcState && pcState.get('loadPCSuccess'),
  );

const makeSelectLoadPCError = () =>
  createSelector(
    selectPC,
    pcState => pcState && pcState.get('loadPCError'),
  );

export {
  selectPC,
  makeSelectLoadingPC,
  makeSelectPC,
  makeSelectLoadPCSuccess,
  makeSelectLoadPCError,
};
