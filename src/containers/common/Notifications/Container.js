import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import Notification from 'gg-components/Notification/Notification';
import STYLES from './notifications.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';

const getClassName = cssModules(STYLES);

const Notifications = props => {
  const { load, notificationsState } = props;
  const { notifications } = notificationsState;

  useTabMadeVisible(load);
  useEffect(() => {
    load();
  }, []);

  const filteredNotifications =
    notifications &&
    notifications.filter(n => {
      if (n.deleted) {
        return false;
      }

      if (!n.type || !n.message) {
        return false;
      }

      return true;
    });

  return (
    <>
      {filteredNotifications &&
        filteredNotifications.map(n => (
          <Notification key={n.id} className={getClassName('notifications__notification')} type={n.type}>
            {n.message}
          </Notification>
        ))}
      <div>
        <DebugObject debugTitle="Notifications" debugObject={{ load, notificationsState }} />
      </div>
    </>
  );
};

Notifications.propTypes = {
  load: PropTypes.func.isRequired,
  notificationsState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    notifications: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Notifications;
