import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cookie from 'react-cookies';
import { cssModules } from 'bpk-react-utils';

import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { DebugObject } from 'gg-components/dist/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

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
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
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

Authenticator.propTypes = {
  cookiesAllowed: PropTypes.bool,
  reauthenticating: PropTypes.bool,
  reauthenticationError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
