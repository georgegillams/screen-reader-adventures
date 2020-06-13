import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { DebugObject } from 'gg-components/Auth';

export default class Authenticator extends React.Component {
  componentDidMount = () => {
    this.props.setCookiesAllowed(true);
    const sessionCookie = cookie.load('session');
    if (sessionCookie) {
      // this.props.setCookiesAllowed(true);
      this.props.reauthenticate();
    }
  };

  render() {
    const {
      cookiesAllowed,
      setCookiesAllowed,
      user,
      userLoading,
      reauthenticate,
      reauthenticating,
      reauthenticationSuccess,
      reauthenticationError,
      sessionKeyChanged,
      className,
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <DebugObject
          debugTitle="Authenticator"
          debugObject={{
            cookiesAllowed,
            setCookiesAllowed,
            user,
            userLoading,
            reauthenticate,
            reauthenticating,
            reauthenticationSuccess,
            reauthenticationError,
            sessionKeyChanged,
            className,
          }}
        />
      </div>
    );
  }
}

Authenticator.propTypes = {};
