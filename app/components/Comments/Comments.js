import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import CommentInput from './CommentInput';
import Comment from './Comment';
import STYLES from './comments.scss';

import { DebugObject, LoggedInOnly } from 'components/Auth';
import { NotificationComp } from 'components/Notifications';
import { Section, SubSection } from 'components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    newComment: PropTypes.object,
    user: PropTypes.object,
    newCommentBeingCreated: PropTypes.bool,
    centered: PropTypes.bool,
    updateComment: PropTypes.func.isRequired,
    onNewCommentChanged: PropTypes.func.isRequired,
    onNewCommentSubmit: PropTypes.func.isRequired,
    commentCreationError: PropTypes.string,
    pageId: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    comments: null,
    newComment: null,
    newCommentBeingCreated: false,
    centered: false,
    commentCreationError: null,
    user: null,
    className: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      comments,
      centered,
      pageId,
      className,
      newComment,
      onNewCommentChanged,
      onCommentSubmit,
      newCommentBeingCreated,
      createComment,
      commentCreationError,
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

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    if (centered) {
      classNameFinal.push(getClassName('blogs--centered'));
    }

    const commentsFiltered = comments
      ? comments.filter(comment => !comment.deleted)
      : null;

    let commentsComponent = null;
    if (commentsFiltered) {
      commentsComponent =
        commentsFiltered.length === 0 ? (
          <SubSection
            noAnchor
            className={getClassName('comments__component')}
            name="No comments yet. Be the first!"
          />
        ) : (
          commentsFiltered.map(comment => (
            <Comment
              user={user}
              comment={comment}
              updateComment={updateComment}
              updatingComment={updatingComment}
              updateCommentError={updateCommentError}
              updateCommentSuccess={updateCommentSuccess}
              deleteComment={deleteComment}
              deletingComment={deletingComment}
              deleteCommentError={deleteCommentError}
              deleteCommentSuccess={deleteCommentSuccess}
            />
          ))
        );
    }

    return (
      <Section name="Comments" className={classNameFinal.join(' ')}>
        {commentsComponent}
        <DebugObject
          debugTitle="Comments"
          debugObject={{
            user,
            comments,
            centered,
            pageId,
            className,
            newComment,
            onNewCommentChanged,
            onCommentSubmit,
            newCommentBeingCreated,
            createComment,
            commentCreationError,
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
      </Section>
    );
  }
}

export default Comments;
