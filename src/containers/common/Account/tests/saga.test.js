import { put, takeLatest } from 'redux-saga/effects';

import { logout, requestVerificationEmail } from '../actions';

import saga, { doLogout, doRequestVerificationEmail } from '../saga';

describe('Account saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should logout on logout TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(logout.TRIGGER, doLogout));
  });

  it('Should request email verification on requestEmailVerification TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(requestVerificationEmail.TRIGGER, doRequestVerificationEmail));
  });

  describe('logout actions', () => {
    let logoutGenerator;

    const response = {
      success: 'you are logged out',
      status: 200,
    };

    beforeEach(() => {
      logoutGenerator = doLogout();

      const selectDescriptor = logoutGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call logout.success on successful API call', () => {
      logoutGenerator.next();
      const putSuccess = logoutGenerator.next(response).value;
      logoutGenerator.next();

      expect(putSuccess).toEqual(put(logout.success(response)));
    });

    it('Should call logout.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      logoutGenerator.next();
      const putSuccess = logoutGenerator.next(response).value;
      logoutGenerator.next();

      expect(putSuccess).toEqual(put(logout.failure(response)));
    });

    it('Should call logout.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = logoutGenerator.throw(response).value;

      expect(putFailure).toEqual(put(logout.failure(response)));
    });
  });

  describe('requestVerificationEmail actions', () => {
    let requestVerificationEmailGenerator;

    const response = {
      success: 'Verification email resent',
      status: 200,
    };

    beforeEach(() => {
      requestVerificationEmailGenerator = doRequestVerificationEmail();

      const selectDescriptor = requestVerificationEmailGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call requestVerificationEmail.success on successful API call', () => {
      requestVerificationEmailGenerator.next();
      const putSuccess = requestVerificationEmailGenerator.next(response).value;
      requestVerificationEmailGenerator.next();

      expect(putSuccess).toEqual(put(requestVerificationEmail.success(response)));
    });

    it('Should call requestVerificationEmail.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      requestVerificationEmailGenerator.next();
      const putSuccess = requestVerificationEmailGenerator.next(response).value;
      requestVerificationEmailGenerator.next();

      expect(putSuccess).toEqual(put(requestVerificationEmail.failure(response)));
    });

    it('Should call requestVerificationEmail.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = requestVerificationEmailGenerator.throw(response).value;

      expect(putFailure).toEqual(put(requestVerificationEmail.failure(response)));
    });
  });
});
