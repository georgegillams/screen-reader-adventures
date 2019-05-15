import { fromJS } from 'immutable';

import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_ERROR,
  LOAD_NOTIFICATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  data: null,
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return state.set('loading', true).set('error', false);
    case LOAD_NOTIFICATIONS_SUCCESS:
      return state.set('loading', false).set('data', action.notifications);
    case LOAD_NOTIFICATIONS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
