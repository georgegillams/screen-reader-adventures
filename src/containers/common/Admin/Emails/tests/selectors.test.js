import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectAdminEmails', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the admin-emails state', () => {
    const state = {
      ...initialState,
      emails: ['email1', 'email2'],
    };

    const mockedState = {
      ['admin-emails']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
