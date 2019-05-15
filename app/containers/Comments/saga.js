import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  RELOAD_COMMENTS,
  LOAD_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './constants';
import {
  reloadComments,
  commentsLoaded,
  commentsLoadingError,
  commentCreateSuccess,
  commentCreateError,
  commentUpdateSuccess,
  commentUpdateError,
  commentDeleteSuccess,
  commentDeleteError,
} from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { makeSelectComment, makeSelectPageId } from './selectors';
import { COMMUNICATION_ERROR_MESSAGE, API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

export function* loadComments() {
  const pageId = yield select(makeSelectPageId());
  const requestURL = `${API_ENDPOINT}/comments/load?pageId=${pageId}`;

  try {
    const comments = yield call(request, requestURL);
    yield put(commentsLoaded(comments));
  } catch (err) {
    yield put(commentsLoadingError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* createComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectPageId());
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
    yield put(commentCreateSuccess(commentResult));
    yield put(reloadComments(pageId));
  } catch (err) {
    yield put(commentCreateError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* updateComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectPageId());
  const requestURL = `${API_ENDPOINT}/comments/update`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(commentUpdateSuccess(commentResult));
    yield put(reloadComments(pageId));
  } catch (err) {
    yield put(commentUpdateError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* deleteComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectPageId());
  const requestURL = `${API_ENDPOINT}/comments/remove`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(commentDeleteSuccess(commentResult));
    yield put(reloadComments(pageId));
  } catch (err) {
    yield put(commentDeleteError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_COMMENTS, loadComments);
  yield takeLatest(RELOAD_COMMENTS, loadComments);
  yield takeLatest(CREATE_COMMENT, createComment);
  yield takeLatest(UPDATE_COMMENT, updateComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}
