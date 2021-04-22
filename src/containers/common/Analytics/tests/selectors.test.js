import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectAnalytics', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the analytic state', () => {
    const state = {
      ...initialState,
      analytic: { browser: 'Firefox' },
    };

    const mockedState = {
      analytics: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
