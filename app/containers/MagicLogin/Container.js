import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PageTitle } from 'gg-components/Typography';
import { DebugObject } from 'gg-components/Auth';
import { Redirect } from 'gg-components/Redirect';

import { CookiesOnly } from 'components/Sessions';
import { REDIRECT_REGEX } from 'helpers/regexConstants';
import appConfig from 'helpers/appConfig';

export default class Login extends React.Component {
  componentDidMount = () => {
    const interval = setInterval(() => {
      const token = new URL(window.location).searchParams.get('token');
      if (this.props.cookiesAllowed) {
        this.props.login(token);
        clearInterval(interval);
      }
    }, 200);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      login,
      user,
      loggingIn,
      logInSuccess,
      logInError,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (logInSuccess) {
      let redirectLocation = new URL(window.location).searchParams.get(
        'redirect',
      );
      if (
        !redirectLocation ||
        redirectLocation === '' ||
        !redirectLocation.match(REDIRECT_REGEX)
      ) {
        redirectLocation = 'account';
      }
      return (
        <Redirect
          className={outerClassNameFinal.join(' ')}
          to={`${appConfig.siteUrl}/${redirectLocation}`}
          name="Logged in"
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="Login" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
          }}
        />
        <PageTitle name="Magic login">
          {user && <text>Logged in!</text>}
        </PageTitle>
        <DebugObject
          debugTitle="Magic login"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            login,
            user,
            loggingIn,
            logInSuccess,
            logInError,
          }}
        />
      </div>
    );
  }
}

Login.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
