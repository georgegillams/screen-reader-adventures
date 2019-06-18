import { fromJS } from 'immutable';

import { SET_KEY, SET_KEY_ERROR, SET_KEY_SUCCESS } from './constants';

const initialState = fromJS({ keyValue: null, setting: false, error: false });

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_KEY:
      return state
        .set('keyValue', action.keyValue)
        .set('setting', true)
        .set('error', false);
    case SET_KEY_SUCCESS:
      return state.set('setting', false).set('success', true);
    case SET_KEY_ERROR:
      return state.set('setting', false).set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
