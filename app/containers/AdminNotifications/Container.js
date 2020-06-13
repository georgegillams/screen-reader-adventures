import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { PageTitle } from 'gg-components/Typography';
import { Button } from 'gg-components/Button';
import { FormBuilder } from 'gg-components/FormBuilder';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';

import NotificationEntity from './NotificationEntity';
import Skeleton from './Skeleton';

import { STRING_REGEX } from 'helpers/regexConstants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class AdminNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newNotification: {} };
  }

  componentDidMount = () => {
    this.props.loadNotifications();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      notifications,
      loadNotifications,
      loadingNotifications,
      loadNotificationsSuccess,
      loadNotificationsError,
      createNotification,
      creatingNotification,
      deleteNotification,
      deletingNotification,
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
            link={{ to: '/admin', text: 'Admin' }}
            name="Admin - notifications"
          >
            <Button onClick={() => loadNotifications()} large>
              Reload notifications
            </Button>
            <br />
            <br />
            <FormBuilder
              entity={this.state.newNotification}
              submitLabel="Create notification"
              formFields={[
                {
                  id: 'type',
                  name: 'Type',
                  validationRegex: STRING_REGEX,
                  show: true,
                },
                {
                  id: 'message',
                  name: 'Messsage',
                  validationRegex: STRING_REGEX,
                  show: true,
                },
              ]}
              disabled={creatingNotification}
              onDataChanged={newNotification => {
                this.setState({ newNotification });
              }}
              onSubmit={() => {
                createNotification(this.state.newNotification);
              }}
            />
            {notifications &&
              notifications.map &&
              notifications.map(n => (
                <NotificationEntity
                  entity={n}
                  className={getClassName('pages__component')}
                  onNotificationUpdateSuccess={loadNotifications}
                >
                  <Button
                    large
                    disabled={deletingNotification}
                    href={`/admin/notifications/${n.id}`}
                  >
                    Edit notification on dedicated page
                  </Button>
                  <br />
                  <br />
                  <Button
                    large
                    destructive
                    disabled={deletingNotification}
                    onClick={() => deleteNotification(n)}
                  >
                    Delete
                  </Button>
                </NotificationEntity>
              ))}
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - notifications" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!notifications && loadingNotifications)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin notifications"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadNotifications,
            notifications,
            loadingNotifications,
            loadNotificationsSuccess,
            loadNotificationsError,
          }}
        />
      </>
    );
  }
}

AdminNotifications.propTypes = {
  createNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  loadNotificationsError: PropTypes.object,
  loadNotificationsSuccess: PropTypes.bool,
  loadingNotifications: PropTypes.bool,
  className: PropTypes.string,
  creatingNotification: PropTypes.bool,
  deletingNotification: PropTypes.bool,
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminNotifications.defaultProps = {
  notifications: null,
  loadNotificationsError: null,
  loadNotificationsSuccess: false,
  loadingNotifications: false,
  className: null,
  creatingNotification: false,
  deletingNotification: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};
