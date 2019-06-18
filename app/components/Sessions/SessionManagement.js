import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import Modal from 'react-responsive-modal';
import { cssModules } from 'bpk-react-utils';

import STYLES from './cookie-banner.scss';

import {
  COOKIE_NAMES,
  APP_VERSION,
  COMPONENT_RELOAD_INTERVAL,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import GGButton from 'components/GGButton';
import { Section, TextLink } from 'components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

// TODO Pass to me please!!
// contentLastUpdatedTimestamp: state.sessions.contentLastUpdatedTimestamp,
// serverContentUpdateTimestamp: state.sessions.serverContentUpdateTimestamp,
// sessions: state.sessions.data,
// newDataAvailable: state.sessions.newDataAvailable,
export default class SessionManagement extends Component {
  static propTypes = {
    contentLastUpdatedTimestamp: PropTypes.number.isRequired,
    serverContentUpdateTimestamp: PropTypes.number.isRequired,
    exposeSession: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired,
    newDataAvailable: PropTypes.bool.isRequired,
    updateNewDataAvailable: PropTypes.func.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object),
    keepAlive: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      sessionDebugViews: false,
      cookieNotificationHidden: false,
      cookiesAccepted: false,
      serverContentUpdateTimestamp: 0,
    };
  }

  componentDidMount = () => {
    const currentAppVersionMajor = APP_VERSION.split('.')[0];
    let cookieAppVersionMajor;
    const appVersionCookie = cookie.load('version');
    if (appVersionCookie) {
      cookieAppVersionMajor = appVersionCookie.split('.')[0];
    }

    if (currentAppVersionMajor !== cookieAppVersionMajor) {
      COOKIE_NAMES.forEach(name => {
        cookie.remove(name);
      });
    }

    const session = cookie.load('session');
    const cookiesAccepted =
      window.localStorage.getItem('cookiesAccepted') === 'true';
    this.setState({
      cookiesAccepted: session && cookiesAccepted,
      sessionDebugViews:
        window.localStorage.getItem('showSessionDebugViews') === 'true',
    });
    this.checkSessionValid(session).then(sessionValid => {
      if (session && sessionValid && cookiesAccepted) {
        this.startKeepAlive(session);
      } else {
        this.setSessionCookie();
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkSessionValid = session =>
    new Promise(resolve => {
      this.props.keepAlive(session).then(
        res => {
          resolve(!res.error);
        },
        err => resolve(false),
      );
    });

  rejectCookies = () => {
    window.location = 'https://duckduckgo.com/';
  };

  acceptCookies = () => {
    this.setState({ cookiesAccepted: true });
    window.localStorage.setItem('cookiesAccepted', 'true');
  };

  setSessionCookie = () => {
    this.props.createSession().then(args => {
      const session = args.sessionKey;
      cookie.save('session', session, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
      });
      cookie.save('version', APP_VERSION, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
      });
      this.startKeepAlive(session);
    });
  };

  startKeepAlive = session => {
    this.props.exposeSession(session);
    this.props.keepAlive(session).then(serverContentUpdateTimestamp => {
      this.props.updateServerContentUpdateTimestamp(
        serverContentUpdateTimestamp,
      );
    });
    // set interval to ping keep-alive with sessionKey
    this.interval = setInterval(() => {
      this.props.keepAlive(session).then(serverContentUpdateTimestamp => {
        if (
          this.props.serverContentUpdateTimestamp &&
          serverContentUpdateTimestamp &&
          serverContentUpdateTimestamp > this.props.serverContentUpdateTimestamp
        ) {
          // Set global state value NEED_TO_UPDATE_FROM_SERVER
          // UNDO after 1 second
          // Render "Reloading notification"
          this.props.updateServerContentUpdateTimestamp(
            serverContentUpdateTimestamp,
          );
          this.props.updateNewDataAvailable(true);
          this.props.loadAuth();
          setTimeout(() => {
            this.props.updateNewDataAvailable(false);
          }, COMPONENT_RELOAD_INTERVAL);
        }
      });
    }, CHECK_FOR_NEW_CONTENT_INTERVAL);
  };

  render() {
    const {
      contentLastUpdatedTimestamp,
      serverContentUpdateTimestamp,
      keepAlive,
      className,
      loadAuth,
      createSession,
      updateServerContentUpdateTimestamp,
      updateNewDataAvailable,
      exposeSession,
      newDataAvailable,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    return (
      <div {...rest}>
        {this.state.sessionDebugViews && newDataAvailable && (
          <div className={getClassName('cookie-banner__new-data-available')}>
            New data has become available on the server. Reloading...
          </div>
        )}
        {this.state.sessionDebugViews && (
          <div className={getClassName('cookie-banner__clut-values')}>
            serverContentUpdateTimestamp: {serverContentUpdateTimestamp}
          </div>
        )}
      </div>
    );
  }
}
