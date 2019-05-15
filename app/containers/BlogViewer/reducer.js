import { fromJS } from 'immutable';

import {
  BLOG_ID_CHANGED,
  LOAD_BLOG,
  LOAD_BLOG_ERROR,
  LOAD_BLOG_SUCCESS,
} from './constants';

const initialState = fromJS({
  blogId: null,
  blog: null,
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case BLOG_ID_CHANGED:
      return state
        .set('loading', false)
        .set('error', false)
        .set('blogId', action.blogId);
    case LOAD_BLOG:
      return state.set('loading', true).set('error', false);
    case LOAD_BLOG_SUCCESS:
      return state.set('loading', false).set('blog', action.blog);
    case LOAD_BLOG_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
