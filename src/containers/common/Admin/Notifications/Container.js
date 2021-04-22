import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import { LoadingCover } from 'gg-components/LoadingCover';
import { Button } from 'gg-components/Button';
import { AdminOnly } from 'components/common/Walls';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import ErrorDisplay from 'components/common/ErrorDisplay';
import NotificationEntity from './NotificationEntity';

import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './admin-notifications.scss';
import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';
import { CreateNotificationForm } from 'components/common/Forms';

const getClassName = cssModules(STYLES);

const AdminNotifications = props => {
  const {
    load,
    create,
    remove,

    notificationsState,
    authenticatorState,
  } = props;

  const { loadError, notifications } = notificationsState;
  const { user } = authenticatorState;

  useTabMadeVisible(load);

  const [newNotification, setNewNotification] = useState({ type: 'success' });

  useEffect(() => {
    load();
  }, []);

  const showNotifications = !!notifications && !!notifications.map && notifications.length > 0;

  const mainControls = (
    <div>
      <Button
        className={getClassName('admin-notifications__control')}
        loading={notificationsState.loading}
        onClick={() => load()}>
        Reload notifications
      </Button>
    </div>
  );

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/notifications');
          }}>
          <div>
            <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin notifications"></PageTitle>
          </div>
          <CreateNotificationForm
            notification={newNotification}
            onDataChanged={setNewNotification}
            onSubmit={() => {
              create(newNotification);
            }}></CreateNotificationForm>
          {mainControls}
          <ErrorDisplay message="Could not load notifications" error={loadError} />
          {showNotifications &&
            notifications.map(n => (
              <NotificationEntity className={getClassName('admin-notifications__entity')} key={n.id} entity={n}>
                <Button
                  destructive
                  disabled={n.deleted}
                  onClick={() => {
                    remove(n);
                  }}>
                  Remove
                </Button>
              </NotificationEntity>
            ))}
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminNotifications"
        debugObject={{
          load,
          notificationsState,
          authenticatorState,
          newNotification,
        }}
      />
    </>
  );
};

AdminNotifications.propTypes = {
  load: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  notificationsState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    notifications: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      highlight: PropTypes.string,
    }).isRequired,
  }),
};

AdminNotifications.defaultProps = {
  notificationsState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminNotifications);
