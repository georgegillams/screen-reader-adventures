import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_BLOGS, DELETE_BLOG, CREATE_BLOG } from './constants';
import {
  loadBlogs,
  deleteBlogSuccess,
  deleteBlogError,
  loadBlogsSuccess,
  loadBlogsError,
} from './actions';
import { makeSelectBlogToDelete } from './selectors';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const loadBlogsSuccessMessage = { type: 'success', message: 'Blogs loaded!' };
const blogsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load blogs.',
};

const blogDeletedMessage = { type: 'success', message: 'Blog deleted!' };
const blogDeleteErrorMessage = {
  type: 'error',
  message: 'Could not delete blog.',
};

export function* doLoadBlogs() {
  const requestURL = apiStructure.loadBlogs.fullPath;

  try {
    const blogsResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (blogsResult.error) {
      yield put(loadBlogsError(blogsResult));
      yield put(pushMessage(blogsLoadErrorMessage));
    } else {
      yield put(loadBlogsSuccess(blogsResult.blogs));
      yield put(pushMessage(loadBlogsSuccessMessage));
    }
  } catch (err) {
    yield put(loadBlogsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteBlog() {
  const blogToDelete = yield select(makeSelectBlogToDelete());
  const requestURL = apiStructure.deleteBlog.fullPath;

  try {
    const blogDeleteResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(blogToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (blogDeleteResult.error) {
      yield put(deleteBlogError(blogDeleteResult));
      yield put(pushMessage(blogDeleteErrorMessage));
    } else {
      yield put(deleteBlogSuccess(blogDeleteResult));
      yield put(pushMessage(blogDeletedMessage));
      yield put(loadBlogs());
    }
  } catch (err) {
    yield put(deleteBlogError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_BLOGS, doLoadBlogs);
  yield takeLatest(DELETE_BLOG, doDeleteBlog);
}
