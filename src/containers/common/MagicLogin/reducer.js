import produce from 'immer';

import { login } from './actions';

export const initialState = {
  token: null,
  loggingIn: false,
  logInError: null,
  logInResult: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case login.TRIGGER:
        draft.token = payload;
        break;

      case login.REQUEST:
        draft.loggingIn = true;
        draft.logInError = null;
        break;

      case login.SUCCESS:
        draft.loggingIn = false;
        draft.logInResult = payload;
        break;

      case login.FAILURE:
        draft.loggingIn = false;
        draft.logInError = payload;
        break;
    }
  });

export default reducer;
