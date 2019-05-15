import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  TEST,
  TEST_PERFORMANCE,
  LOAD_DATA,
  CREATE_DATA,
  DELETE_DATA,
  DELETE_ALL,
} from './constants';
import {
  loadData,
  deleteDataSuccess,
  deleteDataError,
  createDataSuccess,
  createDataError,
  loadDataSuccess,
  loadDataError,
  testSuccess,
  testError,
  testPerformanceSuccess,
  testPerformanceError,
} from './actions';
import {
  makeSelectTestParameters,
  makeSelectTestData,
  makeSelectDataToDelete,
  makeSelectNewData,
} from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';

import request from 'utils/request';

const loadDataSuccessMessage = {
  type: 'success',
  message: 'Data loaded!',
};
const dataLoadErrorMessage = {
  type: 'error',
  message: 'Could not load data.',
};

const dataDeletedMessage = {
  type: 'success',
  message: 'Data deleted!',
};
const dataDeleteErrorMessage = {
  type: 'error',
  message: 'Could not delete data.',
};

const testSuccessMessage = {
  type: 'success',
  message: 'Test finished!',
};
const testErrorMessage = {
  type: 'error',
  message: 'Could not test data.',
};

const dataCreatedMessage = {
  type: 'success',
  message: 'Data created!',
};
const dataCreateErrorMessage = {
  type: 'error',
  message: 'Could not create data.',
};

export function* doLoadData() {
  const dataRequestURL = `${API_ENDPOINT}/grammarML/load`;

  try {
    const dataResult = yield call(request, dataRequestURL, {
      method: 'GET',
    });
    if (dataResult.error) {
      yield put(loadDataError(dataResult));
      yield put(pushMessage(dataLoadErrorMessage));
    } else {
      yield put(loadDataSuccess(dataResult));
      yield put(pushMessage(loadDataSuccessMessage));
    }
  } catch (err) {
    yield put(loadDataError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doMeasurePerformance() {
  const testParameters = yield select(makeSelectTestParameters());
  const testUrl = `${API_ENDPOINT}/grammarML/testPerformance`;

  try {
    const testResult = yield call(request, testUrl, {
      method: 'POST',
      body: JSON.stringify(testParameters),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (testResult.error) {
      yield put(testPerformanceError(testResult));
      yield put(pushMessage(testErrorMessage));
    } else {
      yield put(testPerformanceSuccess(testResult));
      yield put(pushMessage(testSuccessMessage));
    }
  } catch (err) {
    yield put(testPerformanceError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doTestData() {
  const testData = yield select(makeSelectTestData());
  const testUrl = `${API_ENDPOINT}/grammarML/testSentence`;

  try {
    const testResult = yield call(request, testUrl, {
      method: 'POST',
      body: JSON.stringify(testData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (testResult.error) {
      yield put(testError(testResult));
      yield put(pushMessage(testErrorMessage));
    } else {
      yield put(testSuccess(testResult));
      yield put(pushMessage(testSuccessMessage));
    }
  } catch (err) {
    yield put(testError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteData() {
  const dataToDelete = yield select(makeSelectDataToDelete());
  const dataDeleteUrl = `${API_ENDPOINT}/grammarML/remove`;

  try {
    const dataDeleteResult = yield call(request, dataDeleteUrl, {
      method: 'POST',
      body: JSON.stringify(dataToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (dataDeleteResult.error) {
      yield put(deleteDataError(dataDeleteResult));
      yield put(pushMessage(dataDeleteErrorMessage));
    } else {
      yield put(deleteDataSuccess(dataDeleteResult));
      yield put(pushMessage(dataDeletedMessage));
      yield put(loadData());
    }
  } catch (err) {
    yield put(deleteDataError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteAllData() {
  const dataDeleteUrl = `${API_ENDPOINT}/grammarML/removeAll`;

  try {
    const dataDeleteResult = yield call(request, dataDeleteUrl, {
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (dataDeleteResult.error) {
      yield put(deleteDataError(dataDeleteResult));
      yield put(pushMessage(dataDeleteErrorMessage));
    } else {
      yield put(deleteDataSuccess(dataDeleteResult));
      yield put(pushMessage(dataDeletedMessage));
      yield put(loadData());
    }
  } catch (err) {
    yield put(deleteDataError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doCreateData() {
  const newData = yield select(makeSelectNewData());
  const dataDeleteUrl = `${API_ENDPOINT}/grammarML/create`;

  try {
    const dataCreateResult = yield call(request, dataDeleteUrl, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (dataCreateResult.error) {
      yield put(createDataError(dataCreateResult));
      yield put(pushMessage(dataCreateErrorMessage));
    } else {
      yield put(createDataSuccess());
      yield put(pushMessage(dataCreatedMessage));
      yield put(loadData());
    }
  } catch (err) {
    yield put(createDataError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(TEST, () => doTestData());
  yield takeLatest(TEST_PERFORMANCE, () => doMeasurePerformance());
  yield takeLatest(LOAD_DATA, () => doLoadData());
  yield takeLatest(DELETE_DATA, () => doDeleteData());
  yield takeLatest(DELETE_ALL, () => doDeleteAllData());
  yield takeLatest(CREATE_DATA, () => doCreateData());
}
