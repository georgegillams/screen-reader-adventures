import { put, takeLatest } from 'redux-saga/effects';

import { signUp } from '../actions';

import saga, { doSignUp } from '../saga';

describe('Sign up saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should request magic link on TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(signUp.TRIGGER, doSignUp));
  });

  describe('signUp actions', () => {
    let signUpGenerator;

    const response = {
      uname: 'uname',
      email: 'email',
      status: 200,
    };

    beforeEach(() => {
      signUpGenerator = doSignUp();

      const selectDescriptor = signUpGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call signUp.success on successful API call', () => {
      signUpGenerator.next({ credentials: {} });
      signUpGenerator.next();
      const putSuccess = signUpGenerator.next(response).value;
      signUpGenerator.next();

      expect(putSuccess).toEqual(put(signUp.success(response)));
    });

    it('Should call signUp.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      signUpGenerator.next({ credentials: {} });
      signUpGenerator.next();
      const putSuccess = signUpGenerator.next(response).value;
      signUpGenerator.next();

      expect(putSuccess).toEqual(put(signUp.failure(response)));
    });

    it('Should call signUp.failure if an exception occurs', () => {
      signUpGenerator.next({ credentials: {} });
      const response = new Error('Some error');
      const putFailure = signUpGenerator.throw(response).value;

      expect(putFailure).toEqual(put(signUp.failure(response)));
    });
  });
});
