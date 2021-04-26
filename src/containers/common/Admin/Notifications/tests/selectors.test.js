import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectNotifications', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the admin-emails state', () => {
    const state = {
      ...initialState,
      notifications: ['notification1', 'notification2'],
    };

    const mockedState = {
      ['notifications']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
