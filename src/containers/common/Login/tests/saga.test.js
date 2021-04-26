import { put, takeLatest } from 'redux-saga/effects';

import { login } from '../actions';

import saga, { doLogin } from '../saga';

describe('loginRequest Saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should request magic link on TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(login.TRIGGER, doLogin));
  });

  describe('login actions', () => {
    let loginGenerator;

    const response = {
      success: 'magic link sent',
      status: 200,
    };

    beforeEach(() => {
      loginGenerator = doLogin();

      const selectDescriptor = loginGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call login.success on successful API call', () => {
      loginGenerator.next({ credentials: {} });
      loginGenerator.next();
      const putSuccess = loginGenerator.next(response).value;
      loginGenerator.next();

      expect(putSuccess).toEqual(put(login.success(response)));
    });

    it('Should call login.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      loginGenerator.next({ credentials: {} });
      loginGenerator.next();
      const putSuccess = loginGenerator.next(response).value;
      loginGenerator.next();

      expect(putSuccess).toEqual(put(login.failure(response)));
    });

    it('Should call login.failure if an exception occurs', () => {
      loginGenerator.next({ credentials: {} });
      const response = new Error('Some error');
      const putFailure = loginGenerator.throw(response).value;

      expect(putFailure).toEqual(put(login.failure(response)));
    });
  });
});
