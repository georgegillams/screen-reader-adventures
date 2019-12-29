import { actions, selectors, constants } from './redux-definitions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { LOAD_LINKS, ADD_LINK, DELETE_LINK } = constants;
const {
  loadLinks,
  loadLinksRegisterSuccess,
  loadLinksRegisterError,
  addLinkRegisterSuccess,
  addLinkRegisterError,
  deleteLinkRegisterSuccess,
  deleteLinkRegisterError,
} = actions;
const {
  makeSelectLinks,
  makeSelectLinkDefinition,
  makeSelectLinkToDelete,
} = selectors;

const linkAddSuccessMessage = {
  type: 'success',
  message: 'Link added.',
};

const linkDeleteSuccessMessage = {
  type: 'success',
  message: 'Link deleted.',
};

export function* doLoadLinks() {
  const requestURL = `${API_ENDPOINT}/support/load`;

  try {
    const linksResult = yield call(request, requestURL, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (linksResult.error) {
      yield put(loadLinksError(linksResult));
      yield put(pushMessage({ type: 'error', message: linksResult.error }));
    } else if (linksResult.warning) {
      yield put(pushMessage({ type: 'warn', message: linksResult.warning }));
    } else {
      yield put(loadLinksRegisterSuccess(linksResult));
    }
  } catch (err) {
    yield put(loadLinksRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doAddLink() {
  const linkDefinition = yield select(makeSelectLinkDefinition());
  const requestURL = `${API_ENDPOINT}/support/create`;

  try {
    const linksResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(linkDefinition),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (linksResult.error) {
      yield put(addLinkError(linksResult));
      yield put(pushMessage({ type: 'error', message: linksResult.error }));
    } else if (linksResult.warning) {
      yield put(pushMessage({ type: 'warn', message: linksResult.warning }));
    } else {
      yield put(addLinkRegisterSuccess(linksResult));
      yield put(pushMessage(linkAddSuccessMessage));
      yield put(loadLinks());
    }
  } catch (err) {
    yield put(addLinkRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteLink() {
  const linkToDelete = yield select(makeSelectLinkToDelete());
  const requestURL = `${API_ENDPOINT}/support/remove`;

  try {
    const linksResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(linkToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (linksResult.error) {
      yield put(addLinkRegisterError(linksResult));
      yield put(pushMessage({ type: 'error', message: linksResult.error }));
    } else if (linksResult.warning) {
      yield put(pushMessage({ type: 'warn', message: linksResult.warning }));
    } else {
      yield put(deleteLinkRegisterSuccess(linksResult));
      yield put(pushMessage(linkDeleteSuccessMessage));
      yield put(loadLinks());
    }
  } catch (err) {
    yield put(deleteLinkRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_LINKS, doLoadLinks);
  yield takeLatest(ADD_LINK, doAddLink);
  yield takeLatest(DELETE_LINK, doDeleteLink);
}
