import produce from 'immer';

import { login } from './actions';

export const initialState = {
  loggingIn: false,
  loginError: null,
  loginResult: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case login.TRIGGER:
        draft.credentials = payload;
        draft.loginResult = null;
        break;

      case login.REQUEST:
        draft.loggingIn = true;
        draft.loginError = null;
        break;

      case login.SUCCESS:
        draft.loggingIn = false;
        draft.loginResult = payload;
        break;

      case login.FAILURE:
        draft.loggingIn = false;
        draft.loginError = payload;
        break;
    }
  });

export default reducer;
