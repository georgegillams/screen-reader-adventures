import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actions, constants, selectors } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const {
  LOAD_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} = constants;
const {
  loadNotifications,
  deleteNotificationRegisterSuccess,
  deleteNotificationRegisterError,
  createNotificationRegisterSuccess,
  createNotificationRegisterError,
  loadNotificationsRegisterSuccess,
  loadNotificationsRegisterError,
} = actions;
const { makeSelectNotificationToDelete, makeSelectNewNotification } = selectors;

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
  const requestURL = apiStructure.loadNotifications.fullPath;

  try {
    const notificationsResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (notificationsResult.error) {
      yield put(loadNotificationsRegisterError(notificationsResult));
      yield put(pushMessage(notificationsLoadErrorMessage));
    } else {
      yield put(
        loadNotificationsRegisterSuccess(notificationsResult.notifications),
      );
      yield put(pushMessage(loadNotificationsSuccessMessage));
    }
  } catch (err) {
    yield put(loadNotificationsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteNotification() {
  const notificationToDelete = yield select(makeSelectNotificationToDelete());
  const requestURL = apiStructure.deleteNotification.fullPath;

  try {
    const notificationDeleteResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(notificationToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (notificationDeleteResult.error) {
      yield put(deleteNotificationRegisterError(notificationDeleteResult));
      yield put(pushMessage(notificationDeleteErrorMessage));
    } else {
      yield put(deleteNotificationRegisterSuccess(notificationDeleteResult));
      yield put(pushMessage(notificationDeletedMessage));
      yield put(loadNotifications());
    }
  } catch (err) {
    yield put(deleteNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateNotification() {
  const newNotification = yield select(makeSelectNewNotification());
  const requestURL = apiStructure.createNotification.fullPath;

  try {
    const notificationCreateResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newNotification),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (notificationCreateResult.error) {
      yield put(createNotificationRegisterError(notificationCreateResult));
      yield put(pushMessage(notificationCreateErrorMessage));
    } else {
      yield put(createNotificationRegisterSuccess());
      yield put(pushMessage(notificationCreatedMessage));
      yield put(loadNotifications());
    }
  } catch (err) {
    yield put(createNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_NOTIFICATIONS, doLoadNotifications);
  yield takeLatest(DELETE_NOTIFICATION, doDeleteNotification);
  yield takeLatest(CREATE_NOTIFICATION, doCreateNotification);
}
