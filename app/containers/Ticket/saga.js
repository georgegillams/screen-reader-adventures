/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PC } from './constants';
import { loadPCSuccess, loadPCError } from './actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';

import request from 'utils/request';

export function* doLoadPc() {
  const registrationStatusUrl = `${API_ENDPOINT}/registrationStatus/load`;

  try {
    const pc = yield call(request, registrationStatusUrl);
    if (pc.error) {
      yield put(loadPCError(pc));
      yield put(pushMessage({ type: 'error', message: pc.error }));
    } else {
      yield put(loadPCSuccess(pc));
    }
  } catch (err) {
    yield put(loadPCError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* ticketSaga() {
  yield takeLatest(LOAD_PC, () => doLoadPc());
}
