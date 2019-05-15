import { call, put, select, takeLatest } from 'redux-saga/effects';
import { UPDATE_USER_DETAILS, LOAD_USER_DETAILS } from './constants';
import {
  updateUserDetailsSuccessful,
  updateUserDetailsError,
  loadUserDetailsSuccessful,
  loadUserDetailsError,
  makePaymentSuccess,
} from './actions';
import { setUser } from 'containers/App/actions';
import {
  API_ENDPOINT,
  TICKET_COST,
  COMMUNICATION_ERROR_MESSAGE,
} from 'helpers/constants';
import { makeSelectUserDetails, makeSelectPaymentToken } from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';

import request from 'utils/request';

const userDetailsLoadError = {
  type: 'error',
  message: 'Failed to load user details',
};
const userDetailsUpdated = { type: 'success', message: 'User details saved!' };
const userDetailsUpdateError = {
  type: 'error',
  message: 'Failed to save user details',
};

export function* doLoadUserDetails() {
  const requestURL = `${API_ENDPOINT}/userDetails/load`;

  try {
    const loadUserDetailsResult = yield call(request, requestURL);
    if (loadUserDetailsResult.error) {
      yield put(loadUserDetailsError(loadUserDetailsResult));
      yield put(pushMessage(userDetailsLoadError));
    } else {
      yield put(loadUserDetailsSuccessful(loadUserDetailsResult));
    }
  } catch (err) {
    yield put(loadUserDetailsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateUserDetails() {
  const newUserDetails = yield select(makeSelectUserDetails());
  const requestURL = `${API_ENDPOINT}/userDetails/update`;

  try {
    const updateUserDetailsResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newUserDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateUserDetailsResult.error) {
      yield put(updateUserDetailsError(updateUserDetailsResult));
      yield put(pushMessage(userDetailsUpdateError));
    } else {
      yield put(updateUserDetailsSuccessful());
      yield put(pushMessage(userDetailsUpdated));
    }
  } catch (err) {
    yield put(updateUserDetailsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* updateUserDetails() {
  yield takeLatest(UPDATE_USER_DETAILS, () => doUpdateUserDetails());
  yield takeLatest(LOAD_USER_DETAILS, () => doLoadUserDetails());
}
