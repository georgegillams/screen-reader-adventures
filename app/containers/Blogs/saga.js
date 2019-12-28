import { actions, constants } from './redux-definitions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { loadBlogsRegisterSuccess, loadBlogsRegisterError } = actions;
const { LOAD_BLOGS } = constants;

const blogsLoadSuccessMessage = {
  type: 'success',
  message: 'Blogs loaded.',
};

export function* doLoadBlogs() {
  const requestURL = `${API_ENDPOINT}/blogs/load`;

  try {
    const blogsResult = yield call(request, requestURL);
    if (blogsResult.error) {
      yield put(loadBlogsRegisterError(blogsResult));
      yield put(pushMessage({ type: 'error', message: blogsResult.error }));
    } else {
      yield put(loadBlogsRegisterSuccess(blogsResult));
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
