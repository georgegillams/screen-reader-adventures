import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, constants, actions } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

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
  const requestURL = apiStructure.loadBlog.fullPath.split(':id').join(blogId);

  try {
    const blogResult = yield call(request, requestURL, {
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
  const requestURL = apiStructure.updateBlog.fullPath;

  try {
    const updateResult = yield call(request, requestURL, {
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
  const requestURL = apiStructure.createBlog.fullPath;

  try {
    const blogCreateResult = yield call(request, requestURL, {
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

export default function* saga() {
  yield takeLatest(LOAD_BLOG, doLoadBlog);
  yield takeLatest(UPDATE_BLOG, doUpdateBlog);
  yield takeLatest(CREATE_BLOG, doCreateBlog);
}
