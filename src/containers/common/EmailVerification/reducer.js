import produce from 'immer';

import { verify } from './actions';

export const initialState = {
  token: null,
  verifying: false,
  verifyError: null,
  verifyResult: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case verify.TRIGGER:
        draft.token = payload;
        break;

      case verify.REQUEST:
        draft.verifying = true;
        draft.verifyError = null;
        break;

      case verify.SUCCESS:
        draft.verifying = false;
        draft.verifyResult = payload;
        break;

      case verify.FAILURE:
        draft.verifying = false;
        draft.verifyError = payload;
        break;
    }
  });

export default reducer;
