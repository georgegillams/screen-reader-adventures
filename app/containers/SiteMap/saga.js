import { constants, actions } from './redux-definitions';

const { LOAD_BLOGS } = constants;
const { loadBlogsRegisterSuccess, loadBlogsRegisterError } = actions;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* doLoadBlogs() {
  const requestURL = `${API_ENDPOINT}/blogs/load`;

  try {
    const blogs = yield call(request, requestURL); // Can add third arg for options
    yield put(loadBlogsRegisterSuccess(blogs));
  } catch (err) {
    yield put(loadBlogsRegisterError(err));
  }
}

export default function* getBlogs() {
  yield takeLatest(LOAD_BLOGS, doLoadBlogs);
}
