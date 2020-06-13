import { call, put, takeLatest } from 'redux-saga/effects';

import { actions, constants } from './redux-definitions';

import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { loadBlogsRegisterSuccess, loadBlogsRegisterError } = actions;
const { LOAD_BLOGS } = constants;

const blogsLoadSuccessMessage = {
  type: 'success',
  message: 'Blogs loaded.',
};

export function* doLoadBlogs() {
  const apiCapability = apiStructure.loadBlogs;
  const requestURL = apiCapability.fullPath;

  try {
    const blogsResult = yield call(request, requestURL);
    if (blogsResult.error) {
      yield put(loadBlogsRegisterError(blogsResult));
      yield put(
        pushMessage({ type: 'error', message: blogsResult.errorMessage }),
      );
    } else {
      yield put(loadBlogsRegisterSuccess(blogsResult.blogs));
      yield put(pushMessage(blogsLoadSuccessMessage));
    }
  } catch (err) {
    yield put(loadBlogsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_BLOGS, doLoadBlogs);
}
