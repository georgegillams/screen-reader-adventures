import { createSelector } from 'reselect';

const selectComments = state => state.get('comments');

const makeSelectComments = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('data'),
  );

const makeSelectPageId = () => {
  return createSelector(
    selectComments,
    commentsState => commentsState.get('pageId'),
  );
};

const makeSelectCommentsReloading = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('reloading'),
  );

const makeSelectCommentsLoading = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('loading'),
  );

const makeSelectCommentsLoadError = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('error'),
  );

const makeSelectComment = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('comment'),
  );

const makeSelectCreatingComment = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('creating'),
  );

const makeSelectCreateCommentError = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('createCommentError'),
  );

const makeSelectCreateCommentSuccess = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('createCommentSuccess'),
  );

const makeSelectUpdatingComment = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('updating'),
  );

const makeSelectUpdateCommentError = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('updateCommentError'),
  );

const makeSelectUpdateCommentSuccess = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('updateCommentSuccess'),
  );

const makeSelectDeletingComment = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('deleting'),
  );

const makeSelectDeleteCommentError = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('deleteCommentError'),
  );

const makeSelectDeleteCommentSuccess = () =>
  createSelector(
    selectComments,
    commentsState => commentsState.get('deleteCommentSuccess'),
  );

export {
  selectComments,
  makeSelectPageId,
  makeSelectComments,
  makeSelectCommentsLoading,
  makeSelectCommentsReloading,
  makeSelectCommentsLoadError,
  makeSelectComment,
  makeSelectCreatingComment,
  makeSelectCreateCommentError,
  makeSelectCreateCommentSuccess,
  makeSelectUpdatingComment,
  makeSelectUpdateCommentError,
  makeSelectDeletingComment,
  makeSelectDeleteCommentError,
  makeSelectDeleteCommentSuccess,
  makeSelectUpdateCommentSuccess,
};
