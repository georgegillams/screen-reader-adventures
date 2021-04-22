import reducer from '../reducer';
import { load, create, remove } from '../actions';
import { initialState } from '../reducer';

describe('AdminNotifications reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  describe('load actions', () => {
    it('should handle the action load.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(reducer(state, load.trigger())).toEqual(expectResult);
    });

    it('should handle the action load.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loading: true,
      };

      expect(reducer(state, load.request())).toEqual(expectResult);
    });

    it('should return the action load.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        notifications: { notifications: ['notification1', 'notification2'] },
      };

      expect(reducer(state, load.success({ notifications: ['notification1', 'notification2'] }))).toEqual(expectResult);
    });

    it('should return the action load.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadError: 'some error',
      };

      expect(reducer(state, load.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('create actions', () => {
    it('should handle the action create.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        notificationToCreate: 'notificationToCreate',
      };

      expect(reducer(state, create.trigger('notificationToCreate'))).toEqual(expectResult);
    });

    it('should handle the action create.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        creating: true,
      };

      expect(reducer(state, create.request())).toEqual(expectResult);
    });

    it('should return the action create.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(reducer(state, create.success({ success: 'notification created' }))).toEqual(expectResult);
    });

    it('should return the action create.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        createError: 'some error',
      };

      expect(reducer(state, create.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('remove actions', () => {
    it('should handle the action remove.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        notificationToRemove: 'notificationToRemove',
      };

      expect(reducer(state, remove.trigger('notificationToRemove'))).toEqual(expectResult);
    });

    it('should handle the action remove.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        removing: true,
      };

      expect(reducer(state, remove.request())).toEqual(expectResult);
    });

    it('should return the action remove.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(reducer(state, remove.success({ success: 'notification removed' }))).toEqual(expectResult);
    });

    it('should return the action remove.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        removeError: 'some error',
      };

      expect(reducer(state, remove.failure('some error'))).toEqual(expectResult);
    });
  });
});
