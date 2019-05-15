import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlogPreviewContent } from 'components/Typography';

import STYLES from './notification-comp.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

export const NOTIFICATION_TYPES = {
  neutral: 'neutral',
  success: 'success',
  warn: 'warn',
  error: 'error',
};

class NotificationComp extends Component {
  render() {
    const { type, deleted, children, className, ...rest } = this.props;
    const notificationClassName = [getClassName('notification-comp__notification')];
    const elementClassName = [getClassName('notification-comp__element')];

    if (type === 'neutral') {
      notificationClassName.push(getClassName('notification-comp__notification--neutral'));
      elementClassName.push(getClassName('notification-comp__element--neutral'));
    }
    if (type === 'success') {
      notificationClassName.push(getClassName('notification-comp__notification--success'));
      elementClassName.push(getClassName('notification-comp__element--success'));
    }
    if (type === 'warn') {
      notificationClassName.push(getClassName('notification-comp__notification--warn'));
      elementClassName.push(getClassName('notification-comp__element--warn'));
    }
    if (type === 'error') {
      notificationClassName.push(getClassName('notification-comp__notification--error'));
      elementClassName.push(getClassName('notification-comp__element--error'));
    }

    if (className) {
      notificationClassName.push(className);
    }

    return (
      <div className={notificationClassName.join(' ')} {...rest}>
        <BlogPreviewContent
          elementClassName={elementClassName.join(' ')}
          content={`${children}${deleted ? ' (deleted)' : ''}`}
        />
      </div>
    );
  }
}

NotificationComp.propTypes = {
  className: PropTypes.string,
  deleted: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
};

NotificationComp.defaultProps = {
  className: null,
  deleted: false,
  type: 'neutral',
  children: null,
};

export default NotificationComp;
