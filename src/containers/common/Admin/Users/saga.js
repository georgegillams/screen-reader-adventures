import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { load, remove, requestMagicLink, create, update } from './actions';

export function* doLoad() {
  const requestURL = apiStructure.loadUsers.fullPath;

  try {
    yield put(load.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(load.failure(result));
    } else {
      yield put(load.success(result.users));
    }
  } catch (err) {
    yield put(load.failure(err));
  } finally {
    yield put(load.fulfill());
  }
}

export function* doRemove() {
  const currentState = yield select(selectState());
  const { userToRemove } = currentState;
  const requestURL = apiStructure.deleteUser.fullPath;

  try {
    yield put(remove.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(userToRemove),
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

export function* doRequestMagicLink() {
  const currentState = yield select(selectState());
  const { userToLogIn } = currentState;
  const requestURL = apiStructure.requestMagicLink.fullPath;

  try {
    yield put(requestMagicLink.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ email: userToLogIn.email, divertToAdmin: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(requestMagicLink.failure(result));
    } else {
      yield put(requestMagicLink.success(result));
    }
  } catch (err) {
    yield put(requestMagicLink.failure(err));
  } finally {
    yield put(requestMagicLink.fulfill());
  }
}

export function* doCreate() {
  const currentState = yield select(selectState());
  const { userToCreate } = currentState;
  const requestURL = apiStructure.createUser.fullPath;

  try {
    yield put(create.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(userToCreate),
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

export function* doUpdate() {
  const currentState = yield select(selectState());
  const { userToUpdate, onUpdateSuccessCb } = currentState;
  const requestURL = apiStructure.updateUser.fullPath;

  try {
    yield put(update.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(userToUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(update.failure(result));
    } else {
      yield put(update.success(result));
      if (onUpdateSuccessCb) {
        onUpdateSuccessCb(result);
      }
      yield put(load.trigger());
    }
  } catch (err) {
    yield put(update.failure(err));
  } finally {
    yield put(update.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(load.TRIGGER, doLoad);
  yield takeLatest(remove.TRIGGER, doRemove);
  yield takeLatest(requestMagicLink.TRIGGER, doRequestMagicLink);
  yield takeLatest(create.TRIGGER, doCreate);
  yield takeLatest(update.TRIGGER, doUpdate);
}
