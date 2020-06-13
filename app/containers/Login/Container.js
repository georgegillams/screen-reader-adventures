import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { TextLink, PageTitle } from 'gg-components/Typography';
import { DebugObject, LoggedOutOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';

const Login = props => {
  const {
    cookiesAllowed,
    onCookiesAccepted,
    setCredentials,
    credentials,
    login,
    user,
    userLoading,
    userLoadError,
    loggingIn,
    logInSuccess,
    logInError,
    className,
  } = props;
  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  const page = (
    <div className={outerClassNameFinal.join(' ')}>
      <LoggedOutOnly user={user}>
        <PageTitle name="Login">
          <LoginForm
            disabled={loggingIn || logInSuccess}
            credentials={credentials || { useMagicLink: true }}
            onDataChanged={setCredentials}
            onSubmit={login}
            preSubmitText={
              logInSuccess
                ? 'A magic login link has been sent to your email address. Please check your junk folder before requesting another.'
                : null
            }
          />
          <br />
          <TextLink to="/sign-up">
            Not yet got an account? Sign up here.
          </TextLink>
        </PageTitle>
      </LoggedOutOnly>
    </div>
  );

  return (
    <>
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
          setCredentials,
          credentials,
          login,
          user,
          userLoading,
          loggingIn,
          logInSuccess,
          logInError,
        }}
      />
    </>
  );
};

Login.propTypes = {
  loggingIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Login.defaultProps = {
  loggingIn: false,
  className: null,
};

export default Login;
