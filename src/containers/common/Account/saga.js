import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { logout, requestVerificationEmail } from './actions';
import { setUser } from 'containers/common/Authenticator/actions';

export function* doLogout() {
  const requestURL = apiStructure.logout.fullPath;

  try {
    yield put(logout.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
    });

    if (result.error) {
      yield put(logout.failure(result));
    } else {
      yield put(logout.success(result));
      yield put(setUser.trigger(null));
    }
  } catch (err) {
    yield put(logout.failure(err));
  } finally {
    yield put(logout.fulfill());
  }
}

export function* doRequestVerificationEmail() {
  const requestURL = apiStructure.requestVerificationEmail.fullPath;

  try {
    yield put(requestVerificationEmail.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
    });

    if (result.error) {
      yield put(requestVerificationEmail.failure(result));
    } else {
      yield put(requestVerificationEmail.success(result));
    }
  } catch (err) {
    yield put(requestVerificationEmail.failure(err));
  } finally {
    yield put(requestVerificationEmail.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(logout.TRIGGER, doLogout);
  yield takeLatest(requestVerificationEmail.TRIGGER, doRequestVerificationEmail);
}
