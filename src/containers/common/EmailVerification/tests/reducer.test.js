import verificationReducer from '../reducer';
import { verify } from '../actions';
import { initialState } from '../reducer';

describe('verificationReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(verificationReducer(undefined, {})).toEqual(state);
  });

  describe('verify actions', () => {
    it('should handle the action verify.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        token: 'asdfghjkl',
      };

      expect(verificationReducer(state, verify.trigger('asdfghjkl'))).toEqual(expectResult);
    });

    it('should handle the action verify.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        verifying: true,
      };

      expect(verificationReducer(state, verify.request())).toEqual(expectResult);
    });

    it('should return the action verify.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        verifyResult: { success: 'Email verified' },
      };

      expect(verificationReducer(state, verify.success({ success: 'Email verified' }))).toEqual(expectResult);
    });

    it('should return the action verify.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        verifyError: 'some error',
      };

      expect(verificationReducer(state, verify.failure('some error'))).toEqual(expectResult);
    });
  });
});
