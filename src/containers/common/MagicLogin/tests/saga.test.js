import { put, takeLatest } from 'redux-saga/effects';

import { login } from '../actions';

import saga, { doLogin } from '../saga';

describe('MagicLogin saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should login on login TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(login.TRIGGER, doLogin));
  });

  describe('account actions', () => {
    let logoutGenerator;

    const response = {
      success: 'you are logged out',
      status: 200,
    };

    beforeEach(() => {
      logoutGenerator = doLogin();

      const selectDescriptor = logoutGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call login.success on successful API call', () => {
      logoutGenerator.next({ token: 'asdfghjkl' });
      logoutGenerator.next();
      const putSuccess = logoutGenerator.next(response).value;
      logoutGenerator.next();

      expect(putSuccess).toEqual(put(login.success(response)));
    });

    it('Should call login.failure if API returns error', () => {
      logoutGenerator.next({ token: 'asdfghjkl' });
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      logoutGenerator.next();
      const putSuccess = logoutGenerator.next(response).value;
      logoutGenerator.next();

      expect(putSuccess).toEqual(put(login.failure(response)));
    });

    it('Should call login.failure if an exception occurs', () => {
      logoutGenerator.next({ token: 'asdfghjkl' });
      const response = new Error('Some error');
      const putFailure = logoutGenerator.throw(response).value;

      expect(putFailure).toEqual(put(login.failure(response)));
    });
  });
});
