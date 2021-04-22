import produce from 'immer';

import { sendAnalytic } from './actions';

export const initialState = {
  sending: false,
  sendError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case sendAnalytic.TRIGGER:
        draft.analytic = payload;
        break;

      case sendAnalytic.REQUEST:
        draft.sending = true;
        draft.sendError = null;
        break;

      case sendAnalytic.SUCCESS:
        draft.sending = false;
        break;

      case sendAnalytic.FAILURE:
        draft.sending = false;
        draft.sendError = payload;
        break;
    }
  });

export default reducer;
