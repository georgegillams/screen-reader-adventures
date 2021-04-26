import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectLogin', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the login state', () => {
    const state = {
      ...initialState,
      loginResult: { success: 'Magic link sent' },
    };

    const mockedState = {
      login: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
