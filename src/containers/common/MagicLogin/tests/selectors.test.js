import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectLogin', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the magic-login state', () => {
    const state = {
      ...initialState,
      logInResult: { success: 'Logged in' },
    };

    const mockedState = {
      ['magic-login']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
