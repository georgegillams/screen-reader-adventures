import { call, put, takeLatest } from 'redux-saga/effects';

import { constants, actions } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_NOTIFICATIONS } = constants;
const {
  loadNotificationsRegisterSuccess,
  loadNotificationsRegisterError,
} = actions;

export function* doLoadNotifications() {
  const requestURL = apiStructure.loadNotifications.fullPath;

  try {
    const result = yield call(request, requestURL);
    if (result.error) {
      yield put(loadNotificationsRegisterError(result));
    } else {
      yield put(loadNotificationsRegisterSuccess(result.notifications));
    }
  } catch (err) {
    yield put(loadNotificationsRegisterError(err));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_NOTIFICATIONS, doLoadNotifications);
}
