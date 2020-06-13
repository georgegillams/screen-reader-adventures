import { put, takeLatest } from 'redux-saga/effects';

import { LOGOUT, REQUEST_VERIFICATION_EMAIL } from './constants';
import {
  logoutRegisterSuccess,
  logoutRegisterError,
  requestVerificationEmailRegisterError,
  requestVerificationEmailRegisterSuccess,
} from './actions';

import { setUser } from 'containers/App/actions';
import apiStructure from 'helpers/apiStructure';
import { sagaHelper } from 'utils/redux-definitions/saga';

const logoutMessage = { type: 'success', message: 'Logged out!' };
const verificationEmailMessage = {
  type: 'success',
  message: 'Verification email sent!',
};

export function* doRequestVerificationEmail() {
  const requestParams = {
    method: 'POST',
    body: '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    apiStructure.requestVerificationEmail.fullPath,
    requestParams,
    requestVerificationEmailRegisterError,
    requestVerificationEmailRegisterSuccess,
    verificationEmailMessage,
    null,
  );
}

export function* doLogout() {
  const requestParams = {
    method: 'POST',
    body: '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    apiStructure.logout.fullPath,
    requestParams,
    logoutRegisterError,
    logoutRegisterSuccess,
    logoutMessage,
    function*() {
      yield put(setUser(null));
    },
  );
}

export default function* saga() {
  yield takeLatest(LOGOUT, () => doLogout());
  yield takeLatest(REQUEST_VERIFICATION_EMAIL, () =>
    doRequestVerificationEmail(),
  );
}
