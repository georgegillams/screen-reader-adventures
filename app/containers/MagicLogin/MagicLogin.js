import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { DebugObject } from 'components/Auth';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import Redirect from 'components/Redirect';
import {
  REDIRECT_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
  SITE_URL,
} from 'helpers/constants';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED



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
    const outerClassNameFinal = [getClassName('pages__container')];

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
        <Redirect
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
