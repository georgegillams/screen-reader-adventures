import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PageTitle } from 'gg-components/Typography';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { CreateNotificationForm } from 'components/Forms';

export default class AdminNotificationEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newNotification: null };
  }

  componentDidMount = () => {
    const notificationId = this.props.id || this.props.match.params.id;
    if (notificationId) {
      this.props.loadNotification(notificationId);
    }
  };

  render() {
    const {
      id,
      match,
      onNotificationUpdateSuccess,

      setLoginRedirect,
      user,
      userLoading,

      className,

      loadNotification,
      updateNotification,
      notification,
      loadingNotification,
      loadNotificationSuccess,
      loadNotificationError,
      updatingNotification,
      updateNotificationSuccess,
      updateNotificationError,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/notification')}
        >
          <PageTitle
            link={{ to: '/admin/notifications', text: 'Notifications' }}
            name={`Edit notification ${notification && notification.id}`}
          >
            <CreateNotificationForm
              notification={this.state.newNotification || notification || {}}
              submitLabel="Update notification"
              onSubmit={() =>
                updateNotification(
                  this.state.newNotification,
                  onNotificationUpdateSuccess,
                )
              }
              onDataChanged={newValue => {
                this.setState({ newNotification: newValue });
              }}
              disabled={updatingNotification || !this.state.newNotification}
            />
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - edit notification" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || loadingNotification}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin notification"
          debugObject={{
            id,
            match,
            onNotificationUpdateSuccess,
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadNotification,
            updateNotification,
            notification,
            loadingNotification,
            loadNotificationSuccess,
            loadNotificationError,
            updatingNotification,
            updateNotificationSuccess,
            updateNotificationError,
          }}
        />
      </>
    );
  }
}

AdminNotificationEdit.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
