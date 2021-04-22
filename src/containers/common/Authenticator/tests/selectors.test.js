import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectAuthenticator', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the authenticator state', () => {
    const state = {
      ...initialState,
      user: { name: 'userName' },
    };

    const mockedState = {
      authenticator: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
