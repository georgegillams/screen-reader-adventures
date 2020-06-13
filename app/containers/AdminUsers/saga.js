import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, actions, constants } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_USERS, REQUEST_MAGIC_LINK_FOR_USER, DELETE_USER } = constants;
const {
  loadUsersRegisterSuccess,
  loadUsersRegisterError,
  deleteUserRegisterError,
  deleteUserRegisterSuccess,
} = actions;
const { makeSelectMagicLinkUser, makeSelectUserToDelete } = selectors;

const usersLoadedMessage = { type: 'success', message: 'Users loaded!' };
const usersLoadedErrorMessage = {
  type: 'error',
  message: 'Could not load users.',
};
const magicLinkSuccessMessage = {
  type: 'success',
  message: 'Magic link for user sent!',
};
const magicLinkErrorMessage = {
  type: 'error',
  message: 'Could not generate magic link.',
};

const deleteUserSuccessMessage = {
  type: 'success',
  message: 'User deleted.',
};

const deleteUserErrorMessage = {
  type: 'error',
  message: 'Could not delete user.',
};

export function* doDeleteUser() {
  const userToDelete = yield select(makeSelectUserToDelete());
  const requestURL = apiStructure.deleteUser.fullPath;

  try {
    const deleteRequest = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(userToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (deleteRequest.error) {
      yield put(deleteUserRegisterError(deleteRequest));
      yield put(pushMessage(deleteUserErrorMessage));
    } else {
      yield put(deleteUserRegisterSuccess(deleteRequest));
      yield put(pushMessage(deleteUserSuccessMessage));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
    yield put(deleteUserRegisterError({}));
  }
}

export function* doRequestMagicLink() {
  const user = yield select(makeSelectMagicLinkUser());
  const requestURL = apiStructure.requestMagicLink.fullPath;

  try {
    const magicLinkResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ email: user.email, divertToAdmin: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (magicLinkResult.error) {
      yield put(pushMessage(magicLinkErrorMessage));
    } else {
      yield put(pushMessage(magicLinkSuccessMessage));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadUsers() {
  const requestURL = apiStructure.loadUsers.fullPath;

  try {
    const usersResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (usersResult.error) {
      yield put(loadUsersRegisterError(usersResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else {
      yield put(loadUsersRegisterSuccess(usersResult));
      yield put(pushMessage(usersLoadedMessage));
    }
  } catch (err) {
    yield put(loadUsersRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_USERS, doLoadUsers);
  yield takeLatest(REQUEST_MAGIC_LINK_FOR_USER, doRequestMagicLink);
  yield takeLatest(DELETE_USER, doDeleteUser);
}
