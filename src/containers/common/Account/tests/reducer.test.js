import accountReducer from '../reducer';
import { logout, requestVerificationEmail } from '../actions';
import { initialState } from '../reducer';

describe('accountReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(accountReducer(undefined, {})).toEqual(state);
  });

  describe('requestVerificationEmail actions', () => {
    it('should handle the action requestVerificationEmail.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        requestingVerificationEmail: true,
      };

      expect(accountReducer(state, requestVerificationEmail.request())).toEqual(expectResult);
    });

    it('should return the action requestVerificationEmail.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        requestVerificationEmailResult: { success: 'Verification email resent' },
      };

      expect(accountReducer(state, requestVerificationEmail.success({ success: 'Verification email resent' }))).toEqual(
        expectResult
      );
    });

    it('should return the action requestVerificationEmail.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        requestVerificationEmailError: 'some error',
      };

      expect(accountReducer(state, requestVerificationEmail.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('logout actions', () => {
    it('should handle the action logout.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loggingOut: true,
      };

      expect(accountReducer(state, logout.request())).toEqual(expectResult);
    });

    it('should return the action logout.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        logOutResult: { success: 'you are now logged out' },
      };

      expect(accountReducer(state, logout.success({ success: 'you are now logged out' }))).toEqual(expectResult);
    });

    it('should return the action logout.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        logOutError: 'some error',
      };

      expect(accountReducer(state, logout.failure('some error'))).toEqual(expectResult);
    });
  });
});
