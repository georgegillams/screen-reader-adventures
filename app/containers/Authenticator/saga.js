import { REAUTHENTICATE } from './constants';
import { reauthenticateSuccess, reauthenticateError } from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser, setUserLoading } from 'containers/App/actions';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* doReauthentication() {
  yield put(setUserLoading());

  const requestURL = `${API_ENDPOINT}/loadAuth`;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
    });
    if (loginResult.error) {
      yield put(reauthenticateError(loginResult));
      yield put(setUser(null));
    } else {
      yield put(reauthenticateSuccess());
      yield put(setUser(loginResult));
    }
  } catch (err) {
    yield put(reauthenticateError(err));
    yield put(setUser(null));
  }
}

export default function* reauthenticate() {
  yield takeLatest(REAUTHENTICATE, () => doReauthentication());
}
