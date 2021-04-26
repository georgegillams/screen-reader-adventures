import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { load, create, remove } from './actions';

export function* doLoad() {
  const requestURL = apiStructure.loadNotifications.fullPath;

  try {
    yield put(load.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(load.failure(result));
    } else {
      yield put(load.success(result.notifications));
    }
  } catch (err) {
    yield put(load.failure(err));
  } finally {
    yield put(load.fulfill());
  }
}

export function* doCreate() {
  const currentState = yield select(selectState());
  const { notificationToCreate } = currentState;
  const requestURL = apiStructure.createNotification.fullPath;

  try {
    yield put(create.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(notificationToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(create.failure(result));
    } else {
      yield put(create.success(result));
      yield put(load.trigger());
    }
  } catch (err) {
    yield put(create.failure(err));
  } finally {
    yield put(create.fulfill());
  }
}

export function* doRemove() {
  const currentState = yield select(selectState());
  const { notificationToRemove } = currentState;
  const requestURL = apiStructure.deleteNotification.fullPath;

  try {
    yield put(remove.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(notificationToRemove),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(remove.failure(result));
    } else {
      yield put(remove.success(result));
      yield put(load.trigger());
    }
  } catch (err) {
    yield put(remove.failure(err));
  } finally {
    yield put(remove.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(load.TRIGGER, doLoad);
  yield takeLatest(create.TRIGGER, doCreate);
  yield takeLatest(remove.TRIGGER, doRemove);
}
