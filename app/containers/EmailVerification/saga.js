import { select, takeLatest } from 'redux-saga/effects';

import { constants, selectors, actions } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import { sagaHelper } from 'utils/redux-definitions/saga';

const { VERIFY_EMAIL } = constants;
const { verifyEmailRegisterSuccess, verifyEmailRegisterError } = actions;
const { makeSelectToken } = selectors;

const emailVerifiedMessage = { type: 'success', message: 'Email verified!' };

export function* doVerification() {
  const token = yield select(makeSelectToken());
  const requestURL = apiStructure.verifyEmail.fullPath;

  const requestParams = {
    method: 'POST',
    body: JSON.stringify({ verificationKey: token }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield sagaHelper(
    requestURL,
    requestParams,
    verifyEmailRegisterError,
    verifyEmailRegisterSuccess,
    emailVerifiedMessage,
    null,
  );
}

export default function* saga() {
  yield takeLatest(VERIFY_EMAIL, doVerification);
}
