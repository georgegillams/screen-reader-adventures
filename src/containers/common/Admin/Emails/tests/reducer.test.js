import verificationReducer from '../reducer';
import { load, resend } from '../actions';
import { initialState } from '../reducer';

describe('adminEmailsReducer', () => {
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
        emails: { emails: ['email1', 'email2'] },
      };

      expect(verificationReducer(state, load.success({ emails: ['email1', 'email2'] }))).toEqual(expectResult);
    });

    it('should return the action load.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadError: 'some error',
      };

      expect(verificationReducer(state, load.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('resend actions', () => {
    it('should handle the action resend.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        emailToResend: 'emailToResend',
      };

      expect(verificationReducer(state, resend.trigger({ emailToResend: 'emailToResend' }))).toEqual(expectResult);
    });

    it('should handle the action resend.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        resending: true,
      };

      expect(verificationReducer(state, resend.request())).toEqual(expectResult);
    });

    it('should return the action resend.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(verificationReducer(state, resend.success({ success: 'email removed' }))).toEqual(expectResult);
    });

    it('should return the action resend.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        resendError: 'some error',
      };

      expect(verificationReducer(state, resend.failure('some error'))).toEqual(expectResult);
    });
  });
});
