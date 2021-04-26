import produce from 'immer';
import cookie from 'react-cookies';

import { SESSION_COOKIE_KEY, COOKIE_EXPIRY_TIME } from 'helpers/storageConstants';
import { useLocalhost } from 'helpers/appConfig';

import { setUser, loadAuth } from './actions';

export const initialState = {
  loadingAuth: false,
  loadAuthError: null,
  user: undefined,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case setUser.TRIGGER:
        draft.user = payload;
        if (payload && payload.session) {
          cookie.save(SESSION_COOKIE_KEY, payload.session, {
            path: '/',
            secure: !useLocalhost,
            expires: new Date(Date.now() + COOKIE_EXPIRY_TIME),
          });
        }
        break;

      case loadAuth.REQUEST:
        draft.loadingAuth = true;
        draft.loadAuthError = null;
        break;

      case loadAuth.SUCCESS:
        draft.loadingAuth = false;
        draft.user = payload.user;
        break;

      case loadAuth.FAILURE:
        draft.loadingAuth = false;
        draft.loadAuthError = payload;
        break;
    }
  });

export default reducer;
