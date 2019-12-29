import { constants, actions, selectors } from './redux-definitions';

const { LOAD_BLOG } = constants;
const { loadBlogRegisterSuccess, loadBlogRegisterError } = actions;
const { makeSelectBlogId } = selectors;

import { API_ENDPOINT } from 'helpers/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

export function* doLoadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const requestURL = `${API_ENDPOINT}/blogs/loadSingle?id=${blogId}`;

  try {
    const blog = yield call(request, requestURL);
    if (blog.error) {
      yield put(loadBlogRegisterError(blog.error));
    }
    yield put(loadBlogRegisterSuccess(blog));
  } catch (err) {
    yield put(loadBlogRegisterError(err));
  }
}

export default function* getBlog() {
  yield takeLatest(LOAD_BLOG, doLoadBlog);
}
