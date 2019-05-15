import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection, TextLink } from 'components/Typography';
import { DebugObject } from 'components/Auth';
import cookie from 'react-cookies';

import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
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
      success,
      error,
      sessionKeyChanged,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

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
            success,
            error,
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
