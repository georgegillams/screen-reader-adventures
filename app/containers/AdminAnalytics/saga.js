import { call, put, takeLatest } from 'redux-saga/effects';

import { actions, constants } from './redux-definitions';

import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_ANALYTICS } = constants;
const { loadAnalyticsRegisterSuccess, loadAnalyticsRegisterError } = actions;

const loadAnalyticsSuccessMessage = {
  type: 'success',
  message: 'Analytics loaded!',
};
const analyticsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load analytics.',
};

export function* doLoadAnalytics() {
  const requestURL = apiStructure.loadAnalyticsSummary.fullPath;

  try {
    const analyticsResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (analyticsResult.error) {
      yield put(loadAnalyticsRegisterError(analyticsResult));
      yield put(pushMessage(analyticsLoadErrorMessage));
    } else {
      yield put(loadAnalyticsRegisterSuccess(analyticsResult.analytics));
      yield put(pushMessage(loadAnalyticsSuccessMessage));
    }
  } catch (err) {
    yield put(loadAnalyticsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_ANALYTICS, doLoadAnalytics);
}
