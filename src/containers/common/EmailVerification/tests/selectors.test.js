import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectLogin', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the email-verification state', () => {
    const state = {
      ...initialState,
      verifyResult: { success: 'Email verified' },
    };

    const mockedState = {
      ['email-verification']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
