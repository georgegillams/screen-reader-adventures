import { fromJS } from 'immutable';

import { LOAD_MONZO, LOAD_MONZO_ERROR, LOAD_MONZO_SUCCESS } from './constants';

const initialState = fromJS({
  monzoPots: null,
  password: '',
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MONZO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('password', action.password);
    case LOAD_MONZO_SUCCESS:
      return state.set('loading', false).set('monzoPots', action.monzoPots);
    case LOAD_MONZO_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
