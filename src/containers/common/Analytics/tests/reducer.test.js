import analyticsReducer from '../reducer';
import { sendAnalytic } from '../actions';
import { initialState } from '../reducer';

describe('analyticsReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(analyticsReducer(undefined, {})).toEqual(state);
  });

  describe('sendAnalytic actions', () => {
    it('should handle the action sendAnalytic.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        analytic: { browser: 'Firefox', os: 'macOS' },
      };

      expect(analyticsReducer(state, sendAnalytic.trigger({ browser: 'Firefox', os: 'macOS' }))).toEqual(expectResult);
    });

    it('should handle the action sendAnalytic.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        sending: true,
      };

      expect(analyticsReducer(state, sendAnalytic.request())).toEqual(expectResult);
    });

    it('should return the action sendAnalytic.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(analyticsReducer(state, sendAnalytic.success({ user: { name: 'userName' } }))).toEqual(expectResult);
    });

    it('should return the action sendAnalytic.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        sendError: 'some error',
      };

      expect(analyticsReducer(state, sendAnalytic.failure('some error'))).toEqual(expectResult);
    });
  });
});
