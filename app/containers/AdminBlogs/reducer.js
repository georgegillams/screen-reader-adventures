import { fromJS } from 'immutable';

import {
  LOAD_BLOGS,
  LOAD_BLOGS_ERROR,
  LOAD_BLOGS_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
} from './constants';

const initialState = fromJS({
  blogs: null,
  loading: false,
  success: false,
  error: null,
  blogToDelete: null,
  deleting: false,
  deleteSuccess: false,
  deleteError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOGS:
      return state.set('loading', true).set('error', false);
    case LOAD_BLOGS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('blogs', action.blogs);
    case LOAD_BLOGS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case DELETE_BLOG:
      return state
        .set('blogToDelete', action.blog)
        .set('deleting', true)
        .set('deleteError', false);
    case DELETE_BLOG_SUCCESS:
      return state.set('deleting', false).set('deleteSuccess', true);
    case DELETE_BLOG_ERROR:
      return state.set('deleting', false).set('deleteError', action.error);
    default:
      return state;
  }
}

export default appReducer;
