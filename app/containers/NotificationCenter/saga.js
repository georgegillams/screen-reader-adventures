import { LOAD_NOTIFICATIONS } from './constants';
import { notificationsLoaded, notificationLoadingError } from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* loadNotifications() {
  const requestURL = `${API_ENDPOINT}/notifications/load`;

  try {
    const notifications = yield call(request, requestURL);
    yield put(notificationsLoaded(notifications));
  } catch (err) {
    yield put(notificationLoadingError(err));
  }
}

export default function* getNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}
