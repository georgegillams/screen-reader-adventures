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
      users: { users: ['user1', 'user2'] },
    };

    const mockedState = {
      ['admin-users']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
