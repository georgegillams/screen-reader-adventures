import { fromJS } from 'immutable';

import { LOAD_BLOGS, LOAD_BLOGS_ERROR, LOAD_BLOGS_SUCCESS } from './constants';

const initialState = fromJS({
  data: null,
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOGS:
      return state.set('loading', true).set('error', false);
    case LOAD_BLOGS_SUCCESS:
      return state.set('loading', false).set('data', action.blogs);
    case LOAD_BLOGS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
