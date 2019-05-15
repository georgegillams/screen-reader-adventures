import { fromJS } from 'immutable';

import {
  LOAD_GTS_LATEST,
  LOAD_GTS_LATEST_ERROR,
  LOAD_GTS_LATEST_SUCCESS,
} from './constants';

const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GTS_LATEST:
      return state.set('loading', true).set('error', false);
    case LOAD_GTS_LATEST_SUCCESS:
      return state.set('loading', false).set('gtsLatest', action.gtsLatest);
    case LOAD_GTS_LATEST_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
