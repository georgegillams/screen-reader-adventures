import { createSelector } from 'reselect';

const selectAdminRegister = state => state.get('adminregister');

const makeSelectRegister = () =>
  createSelector(
    selectAdminRegister,
    adminRegisterState => adminRegisterState.get('register'),
  );

const makeSelectRegisterLoading = () =>
  createSelector(
    selectAdminRegister,
    adminRegisterState => adminRegisterState.get('loading'),
  );

const makeSelectRegisterLoadedSuccess = () =>
  createSelector(
    selectAdminRegister,
    adminRegisterState => adminRegisterState.get('success'),
  );

const makeSelectRegisterLoadedError = () =>
  createSelector(
    selectAdminRegister,
    adminRegisterState => adminRegisterState.get('error'),
  );

export {
  makeSelectRegister,
  makeSelectRegisterLoading,
  makeSelectRegisterLoadedSuccess,
  makeSelectRegisterLoadedError,
};
