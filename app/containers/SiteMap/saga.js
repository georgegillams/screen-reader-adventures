import { call, put, takeLatest } from 'redux-saga/effects';

import { constants, actions } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_BLOGS } = constants;
const { loadBlogsRegisterSuccess, loadBlogsRegisterError } = actions;

export function* doLoadBlogs() {
  const requestURL = apiStructure.loadBlogs.fullPath;

  try {
    const result = yield call(request, requestURL); // Can add third arg for options
    yield put(loadBlogsRegisterSuccess(result.blogs));
  } catch (err) {
    yield put(loadBlogsRegisterError(err));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_BLOGS, doLoadBlogs);
}
