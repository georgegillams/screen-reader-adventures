import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, selectors, actions } from './redux-definitions';

import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

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

export function* doLoadComments() {
  const pageId = yield select(makeSelectCurrentPageId());
  const requestURL = apiStructure.loadComments.fullPath
    .split(':pageId')
    .join(pageId);

  try {
    const result = yield call(request, requestURL);
    yield put(loadCommentsRegisterSuccess(result.comments));
  } catch (err) {
    yield put(loadCommentsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectCurrentPageId());
  comment.pageId = pageId;
  const requestURL = apiStructure.createComment.fullPath;

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
  const requestURL = apiStructure.updateComment.fullPath;

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
  const requestURL = apiStructure.deleteComment.fullPath;

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
