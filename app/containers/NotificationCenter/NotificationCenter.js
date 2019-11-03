import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { Section, SubSection } from 'gg-components/dist/Typography';
import { NotificationCollection } from 'gg-components/dist/Notifications';
import { DebugObject, LoadingCover } from 'gg-components/dist/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class NotificationCenter extends React.Component {
  componentWillMount = () => {
    this.props.loadNotifications();
  };

  render() {
    const {
      loading,
      error,
      notifications,
      loadNotifications,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (loading) {
      return (
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loading}
          error={error}
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <NotificationCollection notifications={notifications} />
        <DebugObject
          debugTitle="Notifications"
          debugObject={{
            loading,
            error,
            notifications,
            loadNotifications,
          }}
        />
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  notifications: PropTypes.object,
  loadNotifications: PropTypes.func.isRequired,
  className: PropTypes.string,
};
