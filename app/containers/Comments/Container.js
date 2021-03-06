import React from 'react';
import PropTypes from 'prop-types';
import { DebugObject, LoadingCover } from 'gg-components/Auth';

import CommentsListSkeleton from './CommentsListSkeleton';

import Comments, { CommentInput } from 'components/Comments';

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

      currentPageId,
      loadComments,
      loadingComments,
      loadCommentsError,
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
    } = this.props;

    const outerClassNameFinal = [];
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <DebugObject
          debugTitle="Comments"
          debugObject={{
            pageId,
            currentPageId,
            comment,
            className,
            user,
            loadComments,
            loadingComments,
            loadCommentsError,
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
          loadingComments={loadingComments}
          loadCommentsError={loadCommentsError}
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
  loadingComments: PropTypes.bool,
  loadCommentsError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadComments: PropTypes.func.isRequired,
  className: PropTypes.string,
};
