import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { NotificationComp } from 'gg-components/dist/Notifications';
import GGButton from 'gg-components/dist/GGButton';
import { Section } from 'gg-components/dist/Typography';
import FormBuilder from 'components/Forms';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
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
      loadNotifications,
      notifications,
      loading,
      success,
      error,
      createNotification,
      creating,
      deleteNotification,
      deleting,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/notification')}
        >
          <Section name="Admin - notifications">
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
              disabled={creating}
              onDataChanged={newNotification => {
                this.setState({ newNotification });
              }}
              onSubmit={() => {
                createNotification(this.state.newNotification);
              }}
            />
            {notifications &&
              notifications.map &&
              notifications.map(b => (
                <Card
                  className={getClassName(
                    'pages__component',
                    'pages__bpk-card',
                  )}
                >
                  <APIEntity name="more" entityType="Notification" entity={b} />
                  <NotificationComp type={b.type} deleted={b.deleted}>
                    {b.message}
                  </NotificationComp>
                  <GGButton
                    large
                    destructive
                    disabled={deleting}
                    onClick={() => deleteNotification(b)}
                  >
                    Delete
                  </GGButton>
                </Card>
              ))}
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - notifications" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!notifications && loading)}
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
            loading,
            success,
            error,
          }}
        />
      </Fragment>
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
  error: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  creatingNotification: PropTypes.bool,
  deleting: PropTypes.bool,
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminNotifications.defaultProps = {
  notifications: null,
  error: null,
  success: false,
  loading: false,
  className: null,
  creatingNotification: false,
  deleting: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};
