import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectSignUp', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the signUp state', () => {
    const state = {
      ...initialState,
      signUpResult: { success: 'magic link sent' },
    };

    const mockedState = {
      ['sign-up']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
