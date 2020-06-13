import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actions, selectors, constants } from './redux-definitions';

import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const {
  loadPotsRegisterSuccess,
  loadPotsRegisterError,
  loadTransactionsRegisterSuccess,
  loadTransactionsRegisterError,
  addKeyRegisterSuccess,
  addKeyRegisterError,
} = actions;
const { LOAD_POTS, LOAD_TRANSACTIONS, ADD_KEY } = constants;
const { makeSelectPassword, makeSelectKey } = selectors;

const monzoLoadSuccessMessage = {
  type: 'success',
  message: 'Monzo pot data loaded.',
};
const setKeySuccessMessage = {
  type: 'success',
  message: 'Key set!',
};
const setKeyErrorMessage = {
  type: 'error',
  message: 'Could not set key.',
};

export function* doLoadTransactions() {
  const password = yield select(makeSelectPassword());
  const requestURL = apiStructure.loadMonzoTransactions.fullPath;

  if (password.length < 5) {
    return;
  }

  try {
    const monzoResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (monzoResult.error) {
      yield put(loadTransactionsRegisterError(monzoResult));
      yield put(
        pushMessage({ type: 'error', message: monzoResult.errorMessage }),
      );
    } else if (monzoResult.warning) {
      yield put(
        pushMessage({ type: 'warn', message: monzoResult.warningMessage }),
      );
    } else {
      yield put(loadTransactionsRegisterSuccess(monzoResult));
    }
  } catch (err) {
    yield put(loadTransactionsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadPots() {
  const password = yield select(makeSelectPassword());
  const requestURL = apiStructure.loadMonzoPots.fullPath;

  if (password.length < 5) {
    return;
  }

  try {
    const monzoResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (monzoResult.error) {
      yield put(loadPotsRegisterError(monzoResult));
      yield put(
        pushMessage({ type: 'error', message: monzoResult.errorMessage }),
      );
    } else if (monzoResult.warning) {
      yield put(
        pushMessage({ type: 'warn', message: monzoResult.warningMessage }),
      );
    } else {
      yield put(loadPotsRegisterSuccess(monzoResult));
      yield put(pushMessage(monzoLoadSuccessMessage));
    }
  } catch (err) {
    yield put(loadPotsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doAddKey() {
  const keyValue = yield select(makeSelectKey());
  const requestURL = apiStructure.setMonzoAPIKey.fullPath;

  try {
    const setKeyResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ key: keyValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (setKeyResult.error) {
      yield put(pushMessage(setKeyErrorMessage));
      yield put(addKeyRegisterError(setKeyResult));
    } else {
      yield put(pushMessage(setKeySuccessMessage));
      yield put(addKeyRegisterSuccess(setKeyResult));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_POTS, doLoadPots);
  yield takeLatest(LOAD_TRANSACTIONS, doLoadTransactions);
  yield takeLatest(ADD_KEY, doAddKey);
}
