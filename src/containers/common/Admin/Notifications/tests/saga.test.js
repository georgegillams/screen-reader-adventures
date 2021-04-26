import { put, takeLatest } from 'redux-saga/effects';

import { load, create, remove } from '../actions';

import saga, { doCreate, doLoad, doRemove } from '../saga';

describe('AdminNotifications saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load on load TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(load.TRIGGER, doLoad));
  });

  it('Should create on create TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(create.TRIGGER, doCreate));
  });
  it('Should remove on remove TRIGGER', () => {
    mainSaga.next();
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(remove.TRIGGER, doRemove));
  });

  describe('load actions', () => {
    let loadGenerator;

    const response = {
      notifications: ['notification1', 'notification2'],
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

      expect(putSuccess).toEqual(put(load.success(response.notifications)));
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

  describe('create actions', () => {
    let createGenerator;

    const response = {
      success: 'Notification created',
      status: 200,
    };

    beforeEach(() => {
      createGenerator = doCreate();

      const selectDescriptor = createGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call create.success on successful API call', () => {
      createGenerator.next({ notificationToCreate: { id: 'u1' } });
      createGenerator.next();
      const putSuccess = createGenerator.next(response).value;
      createGenerator.next();

      expect(putSuccess).toEqual(put(create.success(response)));
    });

    it('Should call load.trigger on successful API call', () => {
      createGenerator.next({ notificationToCreate: { id: 'u1' } });
      createGenerator.next();
      createGenerator.next(response);
      const putSuccess = createGenerator.next().value;

      expect(putSuccess).toEqual(put(load.trigger()));
    });

    it('Should call create.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      createGenerator.next({ notificationToCreate: { id: 'u1' } });
      createGenerator.next();
      const putFailure = createGenerator.next(response).value;
      createGenerator.next(response);

      expect(putFailure).toEqual(put(create.failure(response)));
    });

    it('Should call create.failure if an exception occurs', () => {
      const response = new Error('Some error');
      createGenerator.next({ notificationToCreate: { id: 'u1' } });
      const putFailure = createGenerator.throw(response).value;

      expect(putFailure).toEqual(put(create.failure(response)));
    });
  });

  describe('remove actions', () => {
    let removeGenerator;

    const response = {
      success: 'Notification removed',
      status: 200,
    };

    beforeEach(() => {
      removeGenerator = doRemove();

      const selectDescriptor = removeGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call remove.success on successful API call', () => {
      removeGenerator.next({ notificationToRemove: { id: 'u1' } });
      removeGenerator.next();
      const putSuccess = removeGenerator.next(response).value;
      removeGenerator.next();

      expect(putSuccess).toEqual(put(remove.success(response)));
    });

    it('Should call load.trigger on successful API call', () => {
      removeGenerator.next({ notificationToRemove: { id: 'u1' } });
      removeGenerator.next();
      removeGenerator.next(response);
      const putSuccess = removeGenerator.next().value;

      expect(putSuccess).toEqual(put(load.trigger()));
    });

    it('Should call remove.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      removeGenerator.next({ notificationToRemove: { id: 'u1' } });
      removeGenerator.next();
      const putFailure = removeGenerator.next(response).value;
      removeGenerator.next(response);

      expect(putFailure).toEqual(put(remove.failure(response)));
    });

    it('Should call remove.failure if an exception occurs', () => {
      const response = new Error('Some error');
      removeGenerator.next({ notificationToRemove: { id: 'u1' } });
      const putFailure = removeGenerator.throw(response).value;

      expect(putFailure).toEqual(put(remove.failure(response)));
    });
  });
});
