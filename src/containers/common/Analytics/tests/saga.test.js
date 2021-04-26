import { put, takeLatest } from 'redux-saga/effects';

import { sendAnalytic } from '../actions';

import saga, { doSendAnalytic } from '../saga';

describe('Analytics saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should send analytic on TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(sendAnalytic.TRIGGER, doSendAnalytic));
  });

  describe('sendAnalytic actions', () => {
    let sendAnalyticGenerator;

    const response = {
      browser: 'Firefox',
      os: 'macOS',
      status: 200,
    };

    beforeEach(() => {
      sendAnalyticGenerator = doSendAnalytic();

      const selectDescriptor = sendAnalyticGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call sendAnalytic.success on successful API call', () => {
      sendAnalyticGenerator.next({ analytic: { browser: 'Firefox' } });
      sendAnalyticGenerator.next();
      const putSuccess = sendAnalyticGenerator.next(response).value;
      sendAnalyticGenerator.next();

      expect(putSuccess).toEqual(put(sendAnalytic.success(response)));
    });

    it('Should call sendAnalytic.failure if an error is returned', () => {
      sendAnalyticGenerator.next({ analytic: { browser: 'Firefox' } });
      sendAnalyticGenerator.next();
      const response = { error: 'auth', errorMessage: 'some error' };
      const putFailure = sendAnalyticGenerator.next(response).value;

      expect(putFailure).toEqual(put(sendAnalytic.failure(response)));
    });

    it('Should call sendAnalytic.failure if an exception occurs', () => {
      sendAnalyticGenerator.next({ analytic: { browser: 'Firefox' } });
      const response = new Error('Some error');
      const putFailure = sendAnalyticGenerator.throw(response).value;

      expect(putFailure).toEqual(put(sendAnalytic.failure(response)));
    });
  });
});
