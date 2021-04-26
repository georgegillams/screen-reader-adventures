import { put, takeLatest } from 'redux-saga/effects';

import { loadAuth } from '../actions';

import saga, { doLoadAuth } from '../saga';

describe('Authenticator saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should get authenticated user on TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadAuth.TRIGGER, doLoadAuth));
  });

  describe('loadAuthenticator actions', () => {
    let loadAuthGenerator;

    const response = {
      name: 'userName',
      status: 200,
    };

    beforeEach(() => {
      loadAuthGenerator = doLoadAuth();

      const selectDescriptor = loadAuthGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadAuth.success on successful API call', () => {
      loadAuthGenerator.next();
      const putSuccess = loadAuthGenerator.next(response).value;
      loadAuthGenerator.next();

      expect(putSuccess).toEqual(put(loadAuth.success(response)));
    });

    it('Should call loadAuth.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = loadAuthGenerator.throw(response).value;

      expect(putFailure).toEqual(put(loadAuth.failure(response)));
    });
  });
});
