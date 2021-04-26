import produce from 'immer';

import { signUp } from './actions';

export const initialState = {
  signingUp: false,
  signUpError: null,
  signUpResult: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case signUp.TRIGGER:
        draft.credentials = payload;
        draft.signUpResult = null;
        break;

      case signUp.REQUEST:
        draft.signingUp = true;
        draft.signUpError = null;
        break;

      case signUp.SUCCESS:
        draft.signingUp = false;
        draft.signUpResult = payload;
        break;

      case signUp.FAILURE:
        draft.signingUp = false;
        draft.signUpError = payload;
        break;
    }
  });

export default reducer;
