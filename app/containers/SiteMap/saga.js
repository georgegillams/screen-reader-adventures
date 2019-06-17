import { LOAD_BLOGS } from './constants';
import { loadBlogsSuccess, loadBlogsError } from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* loadBlogs() {
  const requestURL = `${API_ENDPOINT}/blogs/load`;

  try {
    const blogs = yield call(request, requestURL); // Can add third arg for options
    yield put(loadBlogsSuccess(blogs));
  } catch (err) {
    yield put(loadBlogsError(err));
  }
}

export default function* getBlogs() {
  yield takeLatest(LOAD_BLOGS, loadBlogs);
}
