import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, constants, actions } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_NOTIFICATION, UPDATE_NOTIFICATION } = constants;
const {
  loadNotificationRegisterSuccess,
  loadNotificationRegisterError,
  updateNotificationRegisterError,
  updateNotificationRegisterSuccess,
} = actions;
const {
  makeSelectNotificationId,
  makeSelectNewNotification,
  makeSelectOnUpdateNotificationRegisterSuccess,
} = selectors;

const notificationLoadedMessage = {
  type: 'success',
  message: 'Notification loaded!',
};

const notificationUpdatedMessage = {
  type: 'success',
  message: 'Notification updated!',
};

export function* doLoadNotification() {
  const notificationId = yield select(makeSelectNotificationId());
  const requestURL = apiStructure.loadNotification.fullPath
    .split(':id')
    .join(notificationId);

  try {
    const notificationResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (notificationResult.error) {
      yield put(loadNotificationRegisterError(notificationResult));
      yield put(
        pushMessage({
          type: 'error',
          message: notificationResult.errorMessage,
        }),
      );
    } else {
      yield put(loadNotificationRegisterSuccess(notificationResult));
      yield put(pushMessage(notificationLoadedMessage));
    }
  } catch (err) {
    yield put(loadNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateNotification() {
  const notification = yield select(makeSelectNewNotification());
  const onUpdateNotificationRegisterSuccess = yield select(
    makeSelectOnUpdateNotificationRegisterSuccess(),
  );
  const requestURL = apiStructure.updateNotification.fullPath;

  try {
    const updateResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateNotificationRegisterError(updateResult));
      yield put(
        pushMessage({ type: error, message: updateResult.errorMessage }),
      );
    } else {
      yield put(updateNotificationRegisterSuccess(updateResult));
      if (onUpdateNotificationRegisterSuccess) {
        onUpdateNotificationRegisterSuccess();
      }
      yield put(pushMessage(notificationUpdatedMessage));
    }
  } catch (err) {
    yield put(updateNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_NOTIFICATION, doLoadNotification);
  yield takeLatest(UPDATE_NOTIFICATION, doUpdateNotification);
}
