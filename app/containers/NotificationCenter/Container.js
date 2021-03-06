import React from 'react';
import PropTypes from 'prop-types';
import { NotificationCollection } from 'gg-components/Notifications';
import { DebugObject, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

export default class NotificationCenter extends React.Component {
  componentWillMount = () => {
    this.props.loadNotifications();
  };

  render() {
    const {
      loadNotifications,
      notifications,
      loadingNotifications,
      loadNotificationsError,
      className,
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (loadingNotifications) {
      return (
        <LoadingCover
          loadingSkeleton={Skeleton}
          loadingNotifications={loadingNotifications}
          loadNotificationsError={loadNotificationsError}
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <NotificationCollection notifications={notifications} />
        <DebugObject
          debugTitle="Notifications"
          debugObject={{
            loadingNotifications,
            loadNotificationsError,
            notifications,
            loadNotifications,
          }}
        />
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  loadingNotifications: PropTypes.bool,
  loadNotificationsError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  notifications: PropTypes.object,
  loadNotifications: PropTypes.func.isRequired,
  className: PropTypes.string,
};
