import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import CommentsListSkeleton from './CommentsListSkeleton';

import { DebugObject, LoadingCover } from 'components/Auth';
import Comments, { CommentInput } from 'components/Comments';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class CommentsContainer extends React.Component {
  componentWillMount = () => {
    this.props.loadComments(this.props.pageId);
  };

  render() {
    const {
      pageId,
      comment,
      className,
      user,

      loadComments,
      loading,
      error,
      comments,

      createComment,
      creatingComment,
      createCommentSuccess,
      createCommentError,

      updateComment,
      updatingComment,
      updateCommentSuccess,
      updateCommentError,

      deleteComment,
      deletingComment,
      deleteCommentSuccess,
      deleteCommentError,
      ...rest
    } = this.props;

    const outerClassNameFinal = [];
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <DebugObject
          debugTitle="Comments"
          debugObject={{
            pageId,
            comment,
            className,
            user,
            loadComments,
            loading,
            error,
            comments,
            createComment,
            creatingComment,
            createCommentSuccess,
            createCommentError,
            updateComment,
            updatingComment,
            updateCommentSuccess,
            updateCommentError,
            deleteComment,
            deletingComment,
            deleteCommentSuccess,
            deleteCommentError,
          }}
        />
        <LoadingCover
          loadingSkeleton={CommentsListSkeleton}
          loading={loading}
          error={error}
        >
          {comments && (
            <Comments
              comments={comments}
              user={user}
              centered={false}
              pageId={pageId}
              updateComment={updateComment}
              updatingComment={updatingComment}
              updateCommentError={updateCommentError}
              updateCommentSuccess={updateCommentSuccess}
              deleteComment={deleteComment}
              deletingComment={deletingComment}
              deleteCommentError={deleteCommentError}
              deleteCommentSuccess={deleteCommentSuccess}
            />
          )}
          {comments && (
            <CommentInput
              user={user}
              centered={false}
              pageId={pageId}
              submitLabel="Add comment"
              onSubmit={createComment}
              creatingComment={creatingComment}
              createCommentError={createCommentError}
              createCommentSuccess={createCommentSuccess}
              updateComment={updateComment}
              updatingComment={updatingComment}
              updateCommentError={updateCommentError}
              updateCommentSuccess={updateCommentSuccess}
            />
          )}
        </LoadingCover>
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadComments: PropTypes.func.isRequired,
  className: PropTypes.string,
};
