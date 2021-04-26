import produce from 'immer';

import { load, resend } from './actions';

export const initialState = {
  emails: null,
  loading: false,
  loadError: null,

  emailToResend: null,
  resending: false,
  resendError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case load.REQUEST:
        draft.loading = true;
        draft.loadError = null;
        break;

      case load.SUCCESS:
        draft.loading = false;
        draft.emails = payload;
        break;

      case load.FAILURE:
        draft.loading = false;
        draft.loadError = payload;
        break;

      case resend.TRIGGER:
        draft.emailToResend = payload.emailToResend;
        break;

      case resend.REQUEST:
        draft.resending = true;
        draft.resendError = null;
        break;

      case resend.SUCCESS:
        draft.resending = false;
        break;

      case resend.FAILURE:
        draft.resending = false;
        draft.resendError = payload;
        break;
    }
  });

export default reducer;
