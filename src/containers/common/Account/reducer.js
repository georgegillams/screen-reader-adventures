import produce from 'immer';

import { logout, requestVerificationEmail } from './actions';

export const initialState = {
  loggingOut: false,
  logOutError: null,
  logOutResult: null,
  requestingVerificationEmail: false,
  requestVerificationEmailError: null,
  requestVerificationEmailResult: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case logout.REQUEST:
        draft.loggingOut = true;
        draft.logOutError = null;
        break;

      case logout.SUCCESS:
        draft.loggingOut = false;
        draft.logOutResult = payload;
        break;

      case logout.FAILURE:
        draft.loggingOut = false;
        draft.logOutError = payload;
        break;

      case requestVerificationEmail.REQUEST:
        draft.requestingVerificationEmail = true;
        draft.requestVerificationEmailError = null;
        break;

      case requestVerificationEmail.SUCCESS:
        draft.requestingVerificationEmail = false;
        draft.requestVerificationEmailResult = payload;
        break;

      case requestVerificationEmail.FAILURE:
        draft.requestingVerificationEmail = false;
        draft.requestVerificationEmailError = payload;
        break;
    }
  });

export default reducer;
