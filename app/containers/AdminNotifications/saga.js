import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  LOAD_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from './constants';
import {
  loadNotifications,
  deleteNotificationSuccess,
  deleteNotificationError,
  createNotificationSuccess,
  createNotificationError,
  loadNotificationsSuccess,
  loadNotificationsError,
} from './actions';
import {
  makeSelectNotificationToDelete,
  makeSelectNewNotification,
} from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';

import request from 'utils/request';

const loadNotificationsSuccessMessage = {
  type: 'success',
  message: 'Notifications loaded!',
};
const notificationsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load notifications.',
};

const notificationDeletedMessage = {
  type: 'success',
  message: 'Notification deleted!',
};
const notificationDeleteErrorMessage = {
  type: 'error',
  message: 'Could not delete notification.',
};

const notificationCreatedMessage = {
  type: 'success',
  message: 'Notification created!',
};
const notificationCreateErrorMessage = {
  type: 'error',
  message: 'Could not create notification.',
};

export function* doLoadNotifications() {
  const notificationsRequestURL = `${API_ENDPOINT}/notifications/load`;

  try {
    const notificationsResult = yield call(request, notificationsRequestURL, {
      method: 'GET',
    });
    if (notificationsResult.error) {
      yield put(loadNotificationsError(notificationsResult));
      yield put(pushMessage(notificationsLoadErrorMessage));
    } else {
      yield put(loadNotificationsSuccess(notificationsResult));
      yield put(pushMessage(loadNotificationsSuccessMessage));
    }
  } catch (err) {
    yield put(loadNotificationsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteNotification() {
  const notificationToDelete = yield select(makeSelectNotificationToDelete());
  const notificationDeleteUrl = `${API_ENDPOINT}/notifications/remove`;

  try {
    const notificationDeleteResult = yield call(
      request,
      notificationDeleteUrl,
      {
        method: 'POST',
        body: JSON.stringify(notificationToDelete),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (notificationDeleteResult.error) {
      yield put(deleteNotificationError(notificationDeleteResult));
      yield put(pushMessage(notificationDeleteErrorMessage));
    } else {
      yield put(deleteNotificationSuccess(notificationDeleteResult));
      yield put(pushMessage(notificationDeletedMessage));
      yield put(loadNotifications());
    }
  } catch (err) {
    yield put(deleteNotificationError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateNotification() {
  const newNotification = yield select(makeSelectNewNotification());
  const notificationDeleteUrl = `${API_ENDPOINT}/notifications/create`;

  try {
    const notificationCreateResult = yield call(
      request,
      notificationDeleteUrl,
      {
        method: 'POST',
        body: JSON.stringify(newNotification),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (notificationCreateResult.error) {
      yield put(createNotificationError(notificationCreateResult));
      yield put(pushMessage(notificationCreateErrorMessage));
    } else {
      yield put(createNotificationSuccess());
      yield put(pushMessage(notificationCreatedMessage));
      yield put(loadNotifications());
    }
  } catch (err) {
    yield put(createNotificationError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_NOTIFICATIONS, () => doLoadNotifications());
  yield takeLatest(DELETE_NOTIFICATION, () => doDeleteNotification());
  yield takeLatest(CREATE_NOTIFICATION, () => doCreateNotification());
}
