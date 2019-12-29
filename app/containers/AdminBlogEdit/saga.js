import { selectors, constants, actions } from './redux-definitions';

const { LOAD_BLOG, UPDATE_BLOG, CREATE_BLOG } = constants;
const {
  loadBlogRegisterSuccess,
  loadBlogRegisterError,
  updateBlogRegisterError,
  updateBlogRegisterSuccess,
  createBlogRegisterSuccess,
  createBlogRegisterError,
} = actions;
const { makeSelectBlogId, makeSelectNewBlog } = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const blogCreatedMessage = { type: 'success', message: 'Blog created!' };
const blogCreateErrorMessage = {
  type: 'error',
  message: 'Could not create blog.',
};
const blogLoadedMessage = { type: 'success', message: 'Blog loaded!' };
const blogLoadErrorMessage = {
  type: 'error',
  message: 'Could not load blog.',
};

const blogUpdatedMessage = { type: 'success', message: 'Blog updated!' };
const blogUpdatedErrorMessage = {
  type: 'error',
  message: 'Could not save blog.',
};

export function* doLoadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const blogsRequestURL = `${API_ENDPOINT}/blogs/loadSingle?id=${blogId}`;

  try {
    const blogResult = yield call(request, blogsRequestURL, {
      method: 'GET',
    });
    if (blogResult.error) {
      yield put(loadBlogRegisterError(blogResult));
      yield put(pushMessage(blogLoadErrorMessage));
    } else {
      yield put(loadBlogRegisterSuccess(blogResult));
      yield put(pushMessage(blogLoadedMessage));
    }
  } catch (err) {
    yield put(loadBlogRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateBlog() {
  const blog = yield select(makeSelectNewBlog());
  const blogsRequestURL = `${API_ENDPOINT}/blogs/update`;

  try {
    const updateResult = yield call(request, blogsRequestURL, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateBlogRegisterError(updateResult));
      yield put(pushMessage(blogUpdatedErrorMessage));
    } else {
      yield put(updateBlogRegisterSuccess(updateResult));
      yield put(pushMessage(blogUpdatedMessage));
    }
  } catch (err) {
    yield put(updateBlogRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateBlog() {
  const blog = yield select(makeSelectNewBlog());
  const blogDeleteUrl = `${API_ENDPOINT}/blogs/create`;

  try {
    const blogCreateResult = yield call(request, blogDeleteUrl, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (blogCreateResult.error) {
      yield put(createBlogRegisterError(blogCreateResult));
      yield put(pushMessage(blogCreateErrorMessage));
    } else {
      yield put(createBlogRegisterSuccess(blogCreateResult));
      yield put(pushMessage(blogCreatedMessage));
      window.location = `/admin/blog/edit/${blogCreateResult.id}`;
    }
  } catch (err) {
    yield put(createBlogRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_BLOG, () => doLoadBlog());
  yield takeLatest(UPDATE_BLOG, () => doUpdateBlog());
  yield takeLatest(CREATE_BLOG, () => doCreateBlog());
}
