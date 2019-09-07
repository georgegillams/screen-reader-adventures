import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'gg-components/dist/GGButton';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import CodeInline from 'gg-components/dist/Code';
import { DebugObject, LoggedOutOnly, LoadingCover } from 'components/Auth';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Login extends React.Component {
  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      credentialsChanged,
      credentials,
      login,
      user,
      userLoading,
      userLoadError,
      loggingIn,
      loginSuccess,
      loginError,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoggedOutOnly user={user}>
          <Section name="Login">
            <LoginForm
              disabled={loggingIn || loginSuccess}
              credentials={credentials}
              onDataChanged={credentialsChanged}
              onSubmit={login}
              presubmitText={
                loginSuccess
                  ? 'A magic login link has been sent to your email address. Please check your junk folder before requesting another.'
                  : null
              }
            />
            <br />
            <TextLink to="/sign-up">
              Not yet got an account? Sign up here.
            </TextLink>
          </Section>
        </LoggedOutOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Login" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={onCookiesAccepted}
        />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!cookiesAllowed || userLoading}
          error={userLoadError}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Login"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            credentialsChanged,
            credentials,
            login,
            user,
            userLoading,
            loggingIn,
            loginSuccess,
            loginError,
          }}
        />
      </Fragment>
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
