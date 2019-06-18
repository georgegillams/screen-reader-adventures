import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectComment,
  makeSelectComments,
  makeSelectCommentsLoading,
  makeSelectCommentsLoadError,
  makeSelectCreatingComment,
  makeSelectCreateCommentError,
  makeSelectCreateCommentSuccess,
  makeSelectUpdatingComment,
  makeSelectUpdateCommentError,
  makeSelectUpdateCommentSuccess,
  makeSelectDeletingComment,
  makeSelectDeleteCommentError,
  makeSelectDeleteCommentSuccess,
} from './selectors';
import {
  updateComment,
  deleteComment,
  loadComments,
  createComment,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import Comments from './Comments';

import { makeSelectUser } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  loadComments: pageId => dispatch(loadComments(pageId)),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),

  loading: makeSelectCommentsLoading(),
  error: makeSelectCommentsLoadError(),
  comments: makeSelectComments(),

  comment: makeSelectComment(),
  creatingComment: makeSelectCreatingComment(),
  createCommentSuccess: makeSelectCreateCommentSuccess(),
  createCommentError: makeSelectCreateCommentError(),

  updatingComment: makeSelectUpdatingComment(),
  updateCommentSuccess: makeSelectUpdateCommentSuccess(),
  updateCommentError: makeSelectUpdateCommentError(),

  deletingComment: makeSelectDeletingComment(),
  deleteCommentSuccess: makeSelectDeleteCommentSuccess(),
  deleteCommentError: makeSelectDeleteCommentError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'comments', reducer });
const withSaga = injectSaga({ key: 'comments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Comments);
export { mapDispatchToProps };
