import signUpReducer from '../reducer';
import { signUp } from '../actions';
import { initialState } from '../reducer';

describe('signUpReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(signUpReducer(undefined, {})).toEqual(state);
  });

  describe('signUp actions', () => {
    it('should handle the action signUp.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        signingUp: true,
      };

      expect(signUpReducer(state, signUp.request())).toEqual(expectResult);
    });

    it('should return the action signUp.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        signUpResult: { uname: 'uname', email: 'email' },
      };

      expect(signUpReducer(state, signUp.success({ uname: 'uname', email: 'email' }))).toEqual(expectResult);
    });

    it('should return the action signUp.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        signUpError: 'some error',
      };

      expect(signUpReducer(state, signUp.failure('some error'))).toEqual(expectResult);
    });
  });
});
