import { put, select, takeLatest } from 'redux-saga/effects';

import { actions, selectors, constants } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import { sagaHelper } from 'utils/redux-definitions/saga';

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
const { makeSelectLinkDefinition, makeSelectLinkToDelete } = selectors;

const linkAddSuccessMessage = {
  type: 'success',
  message: 'Link added.',
};

const linkDeleteSuccessMessage = {
  type: 'success',
  message: 'Link deleted.',
};

export function* doLoadLinks() {
  const requestURL = apiStructure.loadSupport.fullPath;

  const requestParams = {
    method: 'GET',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    requestURL,
    requestParams,
    loadLinksRegisterError,
    loadLinksRegisterSuccess,
    null,
    null,
  );
}

export function* doAddLink() {
  const linkDefinition = yield select(makeSelectLinkDefinition());
  const requestURL = apiStructure.createSupport.fullPath;

  const requestParams = {
    method: 'POST',
    body: JSON.stringify(linkDefinition),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    requestURL,
    requestParams,
    addLinkRegisterError,
    addLinkRegisterSuccess,
    linkAddSuccessMessage,
    function*() {
      yield put(loadLinks());
    },
  );
}

export function* doDeleteLink() {
  const linkToDelete = yield select(makeSelectLinkToDelete());
  const requestURL = apiStructure.deleteSupport.fullPath;

  const requestParams = {
    method: 'POST',
    body: JSON.stringify(linkToDelete),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    requestURL,
    requestParams,
    deleteLinkRegisterError,
    deleteLinkRegisterSuccess,
    linkDeleteSuccessMessage,
    function*() {
      yield put(loadLinks());
    },
  );
}

export default function* saga() {
  yield takeLatest(LOAD_LINKS, doLoadLinks);
  yield takeLatest(ADD_LINK, doAddLink);
  yield takeLatest(DELETE_LINK, doDeleteLink);
}
