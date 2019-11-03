import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import { DebugObject } from 'gg-components/dist/Auth';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import { GGRedirect } from 'gg-components/dist/Redirect';
import {
  REDIRECT_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
  SITE_URL,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Login extends React.Component {
  componentDidMount = () => {
    const interval = setInterval(() => {
      const tokenValue = new URL(window.location).searchParams.get('token');
      this.props.tokenChanged(tokenValue);
      if (this.props.cookiesAllowed) {
        this.props.login();
        clearInterval(interval);
      }
    }, 200);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      tokenChanged,
      login,
      user,
      loggingIn,
      loginSuccessful,
      loginError,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (loginSuccessful) {
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
        <GGRedirect
          className={outerClassNameFinal.join(' ')}
          to={`${SITE_URL}/${redirectLocation}`}
          name="Logged in"
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Login" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
          }}
        />
        <Section name="Magic login">{user && <text>Logged in!</text>}</Section>
        <DebugObject
          debugTitle="Magic login"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            tokenChanged,
            login,
            user,
            loggingIn,
            loginSuccessful,
            loginError,
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
