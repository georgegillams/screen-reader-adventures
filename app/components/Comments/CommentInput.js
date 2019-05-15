import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'components/Forms';
import CodeInline from 'components/Code';
import { SubSection } from 'components/Typography';
import { MD_PARTIAL_REGEX, UNAME_REGEX } from 'helpers/constants';

import STYLES from './comments.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

class CommentInput extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onCommentChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newCommentBeingCreated: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string,
  };

  static defaultProps = {
    submitLabel: 'Submit comment',
  };

  constructor(props) {
    super(props);
    this.state = { comment: this.props.comment || { name: '', comment: '' } };
  }

  onCommentChanged = newValue => {
    this.setState({ comment: newValue });
  };

  render() {
    const {
      className,
      centered,
      user,
      onSubmit,
      creatingComment,
      createCommentSuccess,
      createCommentError,
      updateComment,
      updatingComment,
      updateCommentError,
      updateCommentSuccess,
      submitLabel,
      pageId,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        {createCommentSuccess ? (
          <SubSection noAnchor name="Thanks for your comment 👍" />
        ) : (
          <FormBuilder
            entity={
              user
                ? { ...this.state.comment, displayName: user.uname }
                : this.state.comment
            }
            formFields={[
              {
                id: 'displayName',
                name: 'Display name',
                validationRegex: user ? /.*/gi : UNAME_REGEX,
                show: true,
                disabled: !!user,
              },
              {
                id: 'comment',
                name: 'Comment',
                validationRegex: MD_PARTIAL_REGEX,
                show: true,
              },
            ]}
            submitLabel={submitLabel}
            onSubmit={() => onSubmit(this.state.comment)}
            onDataChanged={this.onCommentChanged}
            centered={centered}
            disabled={creatingComment || updatingComment}
            presubmitText={
              <Fragment>
                {'Comments support **'}
                <span style={{ fontWeight: 'bold' }}>bold</span>
                {'**, _'}
                <span style={{ fontStyle: 'italic' }}>italic</span>
                {'_, ~'}
                <span style={{ textDecoration: 'line-through' }}>
                  strikethrough
                </span>
                {'~, [links](http://www.example.com/), > "quotes" <'}
                {' and `'}
                <CodeInline>code</CodeInline>
                {'`'}
              </Fragment>
            }
          />
        )}
      </div>
    );
  }
}

CommentInput.propTypes = {
  centered: PropTypes.bool,
  pageId: PropTypes.number.isRequired,
  className: PropTypes.string,
};

CommentInput.defaultProps = {
  centered: false,
  className: null,
};

export default CommentInput;
