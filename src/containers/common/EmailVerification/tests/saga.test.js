import { put, takeLatest } from 'redux-saga/effects';

import { verify } from '../actions';
import { loadAuth } from 'containers/common/Authenticator/actions';

import saga, { doVerify } from '../saga';

describe('EmailVerification saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should verify on verify TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(verify.TRIGGER, doVerify));
  });

  describe('account actions', () => {
    let verifyGenerator;

    const response = {
      success: 'you are logged out',
      status: 200,
    };

    beforeEach(() => {
      verifyGenerator = doVerify();

      const selectDescriptor = verifyGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call verify.success on successful API call', () => {
      verifyGenerator.next({ token: 'asdfghjkl' });
      verifyGenerator.next();
      const putSuccess = verifyGenerator.next(response).value;
      verifyGenerator.next();

      expect(putSuccess).toEqual(put(verify.success(response)));
    });

    it('Should call loadAuth.trigger on successful API call', () => {
      verifyGenerator.next({ token: 'asdfghjkl' });
      verifyGenerator.next();
      verifyGenerator.next(response);
      const putSuccess = verifyGenerator.next().value;
      verifyGenerator.next();

      expect(putSuccess).toEqual(put(loadAuth.trigger()));
    });

    it('Should call verify.failure if API returns error', () => {
      verifyGenerator.next({ token: 'asdfghjkl' });
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      verifyGenerator.next();
      const putSuccess = verifyGenerator.next(response).value;
      verifyGenerator.next();

      expect(putSuccess).toEqual(put(verify.failure(response)));
    });

    it('Should call verify.failure if an exception occurs', () => {
      verifyGenerator.next({ token: 'asdfghjkl' });
      const response = new Error('Some error');
      const putFailure = verifyGenerator.throw(response).value;

      expect(putFailure).toEqual(put(verify.failure(response)));
    });
  });
});
