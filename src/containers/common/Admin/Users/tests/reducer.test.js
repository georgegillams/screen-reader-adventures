import verificationReducer from '../reducer';
import { load, remove, requestMagicLink, create, update } from '../actions';
import { initialState } from '../reducer';

describe('adminUsersReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(verificationReducer(undefined, {})).toEqual(state);
  });

  describe('load actions', () => {
    it('should handle the action load.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, load.trigger())).toEqual(expectResult);
    });

    it('should handle the action load.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loading: true,
      };

      expect(verificationReducer(state, load.request())).toEqual(expectResult);
    });

    it('should return the action load.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        users: { users: ['user1', 'user2'] },
      };

      expect(verificationReducer(state, load.success({ users: ['user1', 'user2'] }))).toEqual(expectResult);
    });

    it('should return the action load.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadError: 'some error',
      };

      expect(verificationReducer(state, load.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('remove actions', () => {
    it('should handle the action remove.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        userToRemove: 'userToRemove',
      };

      expect(verificationReducer(state, remove.trigger('userToRemove'))).toEqual(expectResult);
    });

    it('should handle the action remove.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        removing: true,
      };

      expect(verificationReducer(state, remove.request())).toEqual(expectResult);
    });

    it('should return the action remove.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, remove.success({ success: 'user removed' }))).toEqual(expectResult);
    });

    it('should return the action remove.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        removeError: 'some error',
      };

      expect(verificationReducer(state, remove.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('requestMagicLink actions', () => {
    it('should handle the action requestMagicLink.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        userToLogIn: 'userToLogIn',
      };

      expect(verificationReducer(state, requestMagicLink.trigger('userToLogIn'))).toEqual(expectResult);
    });

    it('should handle the action requestMagicLink.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        requesting: true,
      };

      expect(verificationReducer(state, requestMagicLink.request())).toEqual(expectResult);
    });

    it('should return the action requestMagicLink.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, requestMagicLink.success({ success: 'magic link sent' }))).toEqual(
        expectResult
      );
    });

    it('should return the action requestMagicLink.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        requestError: 'some error',
      };

      expect(verificationReducer(state, requestMagicLink.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('create actions', () => {
    it('should handle the action create.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        userToCreate: 'userToCreate',
      };

      expect(verificationReducer(state, create.trigger('userToCreate'))).toEqual(expectResult);
    });

    it('should handle the action create.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        creating: true,
      };

      expect(verificationReducer(state, create.request())).toEqual(expectResult);
    });

    it('should return the action create.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, create.success({ success: 'user created' }))).toEqual(expectResult);
    });

    it('should return the action create.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        createError: 'some error',
      };

      expect(verificationReducer(state, create.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('update actions', () => {
    it('should handle the action update.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        userToUpdate: 'userToCreate',
        onUpdateSuccessCb: 'on success cb',
      };

      expect(
        verificationReducer(state, update.trigger({ userToUpdate: 'userToCreate', onUpdateSuccessCb: 'on success cb' }))
      ).toEqual(expectResult);
    });

    it('should handle the action update.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        updating: true,
      };

      expect(verificationReducer(state, update.request())).toEqual(expectResult);
    });

    it('should return the action update.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, update.success({ success: 'user updated' }))).toEqual(expectResult);
    });

    it('should return the action update.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        updateError: 'some error',
      };

      expect(verificationReducer(state, update.failure('some error'))).toEqual(expectResult);
    });
  });
});
