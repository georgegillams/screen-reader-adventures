import reducer from '../reducer';
import { load } from '../actions';
import { initialState } from '../reducer';

describe('AdminAnalytics reducer', () => {
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
        analytics: { analytics: ['analytic1', 'analytic2'] },
      };

      expect(reducer(state, load.success({ analytics: ['analytic1', 'analytic2'] }))).toEqual(expectResult);
    });

    it('should return the action load.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadError: 'some error',
      };

      expect(reducer(state, load.failure('some error'))).toEqual(expectResult);
    });
  });
});
