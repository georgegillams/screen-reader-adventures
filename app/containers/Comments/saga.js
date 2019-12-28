import { constants, selectors, actions } from './redux-definitions';

const {
  LOAD_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} = constants;
const {
  loadComments,
  loadCommentsRegisterSuccess,
  loadCommentsRegisterError,
  createCommentRegisterSuccess,
  createCommentRegisterError,
  updateCommentRegisterSuccess,
  updateCommentRegisterError,
  deleteCommentRegisterSuccess,
  deleteCommentRegisterError,
} = actions;
const { makeSelectComment, makeSelectCurrentPageId } = selectors;

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { COMMUNICATION_ERROR_MESSAGE, API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* doLoadComments() {
  const pageId = yield select(makeSelectCurrentPageId());
  const requestURL = `${API_ENDPOINT}/comments/load?pageId=${pageId}`;

  try {
    const comments = yield call(request, requestURL);
    yield put(loadCommentsRegisterSuccess(comments));
  } catch (err) {
    yield put(loadCommentsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectCurrentPageId());
  comment.pageId = pageId;
  const requestURL = `${API_ENDPOINT}/comments/create`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(createCommentRegisterSuccess(commentResult));
    yield put(loadComments(pageId));
  } catch (err) {
    yield put(createCommentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectCurrentPageId());
  const requestURL = `${API_ENDPOINT}/comments/update`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(updateCommentRegisterSuccess(commentResult));
    yield put(loadComments(pageId));
  } catch (err) {
    yield put(updateCommentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectCurrentPageId());
  const requestURL = `${API_ENDPOINT}/comments/remove`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteCommentRegisterSuccess(commentResult));
    yield put(loadComments(pageId));
  } catch (err) {
    yield put(deleteCommentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_COMMENTS, doLoadComments);
  yield takeLatest(CREATE_COMMENT, doCreateComment);
  yield takeLatest(UPDATE_COMMENT, doUpdateComment);
  yield takeLatest(DELETE_COMMENT, doDeleteComment);
}
