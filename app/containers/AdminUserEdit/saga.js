import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, constants, actions } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { UPDATE_USERTOEDIT } = constants;
const {
  updateUsertoeditRegisterError,
  updateUsertoeditRegisterSuccess,
} = actions;
const {
  makeSelectNewUsertoedit,
  makeSelectOnUpdateUsertoeditRegisterSuccess,
} = selectors;

const usertoeditUpdatedMessage = {
  type: 'success',
  message: 'User updated!',
};

export function* doUpdateUsertoedit() {
  const usertoedit = yield select(makeSelectNewUsertoedit());
  const onUpdateUsertoeditRegisterSuccess = yield select(
    makeSelectOnUpdateUsertoeditRegisterSuccess(),
  );
  const requestURL = apiStructure.updateUser.fullPath;

  try {
    const updateResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(usertoedit),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateUsertoeditRegisterError(updateResult));
      yield put(
        pushMessage({ type: error, message: updateResult.errorMessage }),
      );
    } else {
      yield put(updateUsertoeditRegisterSuccess(updateResult));
      if (onUpdateUsertoeditRegisterSuccess) {
        onUpdateUsertoeditRegisterSuccess();
      }
      yield put(pushMessage(usertoeditUpdatedMessage));
    }
  } catch (err) {
    yield put(updateUsertoeditRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(UPDATE_USERTOEDIT, doUpdateUsertoedit);
}
