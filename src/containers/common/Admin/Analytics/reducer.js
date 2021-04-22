import produce from 'immer';

import { load } from './actions';

export const initialState = {
  analytics: null,
  loading: false,
  loadError: null,
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
        draft.analytics = payload;
        break;

      case load.FAILURE:
        draft.loading = false;
        draft.loadError = payload;
        break;
    }
  });

export default reducer;
