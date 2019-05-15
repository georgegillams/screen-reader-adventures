import { fromJS } from 'immutable';

import {
  RELOAD_COMMENTS,
  LOAD_COMMENTS,
  LOAD_COMMENTS_ERROR,
  LOAD_COMMENTS_SUCCESS,
  CREATE_COMMENT,
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  data: null,
  loading: false,
  reloading: false,
  error: false,
  comment: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case RELOAD_COMMENTS:
      return state
        .set('pageId', action.pageId)
        .set('reloading', true)
        .set('error', false);
    case LOAD_COMMENTS:
      return state
        .set('pageId', action.pageId)
        .set('loading', true)
        .set('error', false);
    case LOAD_COMMENTS_SUCCESS:
      return state
        .set('reloading', false)
        .set('loading', false)
        .set('data', action.comments);
    case LOAD_COMMENTS_ERROR:
      return state
        .set('error', action.error)
        .set('reloading', false)
        .set('loading', false);
    case CREATE_COMMENT:
      return state
        .set('creating', true)
        .set('createCommentError', false)
        .set('comment', action.comment);
    case CREATE_COMMENT_SUCCESS:
      return state.set('creating', false).set('createCommentSuccess', true);
    case CREATE_COMMENT_ERROR:
      return state
        .set('createCommentError', action.error)
        .set('creating', false);
    case UPDATE_COMMENT:
      return state
        .set('updating', true)
        .set('updateCommentError', false)
        .set('comment', action.comment);
    case UPDATE_COMMENT_SUCCESS:
      return state.set('updating', false).set('updateCommentSuccess', true);
    case UPDATE_COMMENT_ERROR:
      return state
        .set('updateCommentError', action.error)
        .set('updating', false);
    case DELETE_COMMENT:
      return state
        .set('deleting', true)
        .set('deleteCommentError', false)
        .set('comment', action.comment);
    case DELETE_COMMENT_SUCCESS:
      return state.set('deleting', false).set('deleteCommentSuccess', true);
    case DELETE_COMMENT_ERROR:
      return state
        .set('deleteCommentError', action.error)
        .set('deleting', false);
    default:
      return state;
  }
}

export default appReducer;
