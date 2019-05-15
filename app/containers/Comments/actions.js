import {
  RELOAD_COMMENTS,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './constants';

export function reloadComments(pageId) {
  return {
    type: RELOAD_COMMENTS,
    pageId,
  };
}

export function loadComments(pageId) {
  return {
    type: LOAD_COMMENTS,
    pageId,
  };
}

export function commentsLoaded(comments) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    comments,
  };
}

export function commentsLoadingError(error) {
  return {
    type: LOAD_COMMENTS_ERROR,
    error,
  };
}

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment,
  };
}

export function commentCreateSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    comment,
  };
}

export function commentCreateError(error) {
  return {
    type: CREATE_COMMENT_ERROR,
    error,
  };
}

export function updateComment(comment) {
  console.log(`actions.updateComment`);
  return {
    type: UPDATE_COMMENT,
    comment,
  };
}

export function commentUpdateSuccess(comment) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    comment,
  };
}

export function commentUpdateError(error) {
  return {
    type: UPDATE_COMMENT_ERROR,
    error,
  };
}

export function deleteComment(comment) {
  console.log(`actions.deleteComment`);
  return {
    type: DELETE_COMMENT,
    comment,
  };
}

export function commentDeleteSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment,
  };
}

export function commentDeleteError(error) {
  return {
    type: DELETE_COMMENT_ERROR,
    error,
  };
}
