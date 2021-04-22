import magicLinkReducer from '../reducer';
import { login } from '../actions';
import { initialState } from '../reducer';

describe('magicLinkReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(magicLinkReducer(undefined, {})).toEqual(state);
  });

  describe('login actions', () => {
    it('should handle the action login.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        token: 'asdfghjkl',
      };

      expect(magicLinkReducer(state, login.trigger('asdfghjkl'))).toEqual(expectResult);
    });

    it('should handle the action login.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loggingIn: true,
      };

      expect(magicLinkReducer(state, login.request())).toEqual(expectResult);
    });

    it('should return the action login.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        logInResult: { success: 'Log in successful' },
      };

      expect(magicLinkReducer(state, login.success({ success: 'Log in successful' }))).toEqual(expectResult);
    });

    it('should return the action login.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        logInError: 'some error',
      };

      expect(magicLinkReducer(state, login.failure('some error'))).toEqual(expectResult);
    });
  });
});
