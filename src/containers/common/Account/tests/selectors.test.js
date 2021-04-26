import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectLogin', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the account state', () => {
    const state = {
      ...initialState,
      logOutResult: { success: 'Logged out' },
    };

    const mockedState = {
      account: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
