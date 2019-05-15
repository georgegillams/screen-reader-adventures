import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOG } from './constants';
import { loadBlogSuccess, loadBlogError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';
import { makeSelectBlogId } from './selectors';

import request from 'utils/request';

export function* loadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const requestURL = `${API_ENDPOINT}/blogs/loadSingle?id=${blogId}`;

  try {
    const blog = yield call(request, requestURL);
    yield put(loadBlogSuccess(blog));
  } catch (err) {
    yield put(loadBlogError(err));
  }
}

export default function* getBlog() {
  yield takeLatest(LOAD_BLOG, loadBlog);
}
