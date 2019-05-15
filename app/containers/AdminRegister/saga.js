import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REGISTER } from './constants';
import { loadRegisterSuccess, loadRegisterError } from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { associate } from 'helpers/objects';

import request from 'utils/request';

const registerLoadedMessage = { type: 'success', message: 'Register loaded!' };
const registerLoadedErrorMessage = {
  type: 'error',
  message: 'Could not load register.',
};

export function* doLoadRegister() {
  const registerRequestUrl = `${API_ENDPOINT}/registrationStatus/loadRegister`;

  try {
    const registerResult = yield call(request, registerRequestUrl, {
      method: 'GET',
    });
    if (registerResult.error) {
      yield put(loadRegisterError(registerResult));
      yield put(pushMessage(registerResult.error));
    } else {
      yield put(loadRegisterSuccess(registerResult));
      yield put(pushMessage(registerLoadedMessage));
    }
  } catch (err) {
    yield put(loadRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_REGISTER, () => doLoadRegister());
}
