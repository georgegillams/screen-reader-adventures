import loginReducer from '../reducer';
import { login } from '../actions';
import { initialState } from '../reducer';

describe('loginReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(state);
  });

  describe('login actions', () => {
    it('should handle the action login.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loggingIn: true,
      };

      expect(loginReducer(state, login.request())).toEqual(expectResult);
    });

    it('should return the action login.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        loginResult: { success: 'magic link sent' },
      };

      expect(loginReducer(state, login.success({ success: 'magic link sent' }))).toEqual(expectResult);
    });

    it('should return the action login.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loginError: 'some error',
      };

      expect(loginReducer(state, login.failure('some error'))).toEqual(expectResult);
    });
  });
});
