import { put, takeLatest } from 'redux-saga/effects';

import { load, resend } from '../actions';

import saga, { doLoad, doResend } from '../saga';

describe('AdminEmails saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load on load TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(load.TRIGGER, doLoad));
  });

  it('Should resend on resend TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(resend.TRIGGER, doResend));
  });

  describe('load actions', () => {
    let loadGenerator;

    const response = {
      emails: ['email1', 'email2'],
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

      expect(putSuccess).toEqual(put(load.success(response.emails)));
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

  describe('resend actions', () => {
    let resendGenerator;

    const response = {
      success: 'Email resent',
      status: 200,
    };

    beforeEach(() => {
      resendGenerator = doResend();

      const selectDescriptor = resendGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call resend.success on successful API call', () => {
      resendGenerator.next({ emailToResend: { id: 'e1' } });
      resendGenerator.next();
      const putSuccess = resendGenerator.next(response).value;
      resendGenerator.next();

      expect(putSuccess).toEqual(put(resend.success(response.emails)));
    });

    it('Should call load.trigger on successful API call', () => {
      resendGenerator.next({ emailToResend: { id: 'e1' } });
      resendGenerator.next();
      resendGenerator.next(response);
      const putSuccess = resendGenerator.next().value;

      expect(putSuccess).toEqual(put(load.trigger()));
    });

    it('Should call resend.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      resendGenerator.next({ emailToResend: { id: 'e1' } });
      resendGenerator.next();
      const putFailure = resendGenerator.next(response).value;
      resendGenerator.next(response);

      expect(putFailure).toEqual(put(resend.failure(response)));
    });

    it('Should call resend.failure if an exception occurs', () => {
      const response = new Error('Some error');
      resendGenerator.next({ emailToResend: { id: 'e1' } });
      const putFailure = resendGenerator.throw(response).value;

      expect(putFailure).toEqual(put(resend.failure(response)));
    });
  });
});
