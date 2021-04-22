import { put, takeLatest } from 'redux-saga/effects';

import { load } from '../actions';

import saga, { doLoad } from '../saga';

describe('AdminAnalytics saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load on load TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(load.TRIGGER, doLoad));
  });

  describe('load actions', () => {
    let loadGenerator;

    const response = {
      analytics: ['analytic1', 'analytic2'],
      status: 200,
    };

    beforeEach(() => {
      loadGenerator = doLoad();

      const selectDescriptor = loadGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call load.success on successful API call', () => {
      loadGenerator.next();
      const putSuccess = loadGenerator.next(response).value;
      loadGenerator.next();

      expect(putSuccess).toEqual(put(load.success(response.analytics)));
    });

    it('Should call load.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      loadGenerator.next();
      const putFailure = loadGenerator.next(response).value;
      loadGenerator.next();

      expect(putFailure).toEqual(put(load.failure(response)));
    });

    it('Should call load.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = loadGenerator.throw(response).value;

      expect(putFailure).toEqual(put(load.failure(response)));
    });
  });
});
