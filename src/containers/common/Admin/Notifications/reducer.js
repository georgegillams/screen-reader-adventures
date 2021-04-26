import produce from 'immer';

import { load, create, remove } from './actions';

export const initialState = {
  notifications: null,
  loading: false,
  loadError: null,

  notificationToCreate: null,
  creating: false,
  createError: null,

  notificationToRemove: null,
  removing: false,
  removeError: null,
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
        draft.notifications = payload;
        break;

      case load.FAILURE:
        draft.loading = false;
        draft.loadError = payload;
        break;

      case create.TRIGGER:
        draft.notificationToCreate = payload;
        break;

      case create.REQUEST:
        draft.creating = true;
        draft.createError = null;
        break;

      case create.SUCCESS:
        draft.creating = false;
        break;

      case create.FAILURE:
        draft.creating = false;
        draft.createError = payload;
        break;

      case remove.TRIGGER:
        draft.notificationToRemove = payload;
        break;

      case remove.REQUEST:
        draft.removing = true;
        draft.removeError = null;
        break;

      case remove.SUCCESS:
        draft.removing = false;
        break;

      case remove.FAILURE:
        draft.removing = false;
        draft.removeError = payload;
        break;
    }
  });

export default reducer;
