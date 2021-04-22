import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import { Paragraph } from 'gg-components/Paragraph';

import TextLink from 'components/common/TextLink';
import ErrorDisplay from 'components/common/ErrorDisplay';
import CookiesRequired from 'containers/common/CookiesRequired';
import { withRouter } from 'next/router';
import { REDIRECT_REGEX } from 'helpers/regexConstants';
import { CONSENT_STATE_ALLOWED } from 'containers/common/Consent/constants';

const MagicLogin = props => {
  const [loginAttempted, setLoginAttempted] = useState(false);

  const {
    router,

    login,

    consentState,
    magicLoginState,
    authenticatorState,

    className,
  } = props;

  const { logInError, logInResult } = magicLoginState;

  useEffect(() => {
    let token = null;
    if (router && router.query) {
      token = router.query.token;
    }
    // We want to wait for cookies to be accepted before logging in
    if (!loginAttempted && token && consentState.cookieConsent === CONSENT_STATE_ALLOWED) {
      login(token);
      setLoginAttempted(true);
    }
  }, [consentState, router]);

  const { user } = authenticatorState;

  const success = user && logInResult && !logInError;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  let redirectLocation = 'account';
  if (success) {
    if (router && router.query) {
      redirectLocation = router.query.redirect;
    }
    if (!redirectLocation || redirectLocation === '' || !redirectLocation.match(REDIRECT_REGEX)) {
      redirectLocation = 'account';
    }
    setTimeout(() => {
      router.push(`/${redirectLocation}`);
    }, 1000);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <CookiesRequired reason={'log in'} />
      <PageTitle name={success ? 'Logged in' : 'Logging in'}>
        {success && (
          <Paragraph>
            Logged in!
            <br />
            You will now be redirected to the {redirectLocation} page
            <br />
            <TextLink href={redirectLocation}>Not been redirected? Click here</TextLink>
          </Paragraph>
        )}
        <ErrorDisplay message="Something went wrong logging you in" error={logInError}>
          <TextLink href={'/login'}>Try logging in again</TextLink>
        </ErrorDisplay>
      </PageTitle>
      <DebugObject
        debugTitle="MagicLogin"
        debugObject={{
          login,
          authenticatorState,
          magicLoginState,
        }}
      />
    </div>
  );
};

MagicLogin.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
    query: PropTypes.shape({
      token: PropTypes.string,
      redirect: PropTypes.string,
    }).isRequired,
  }),
  login: PropTypes.func.isRequired,
  magicLoginState: PropTypes.shape({
    token: PropTypes.string,
    loggingIn: PropTypes.bool,
    logInError: PropTypes.object,
    logInResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  consentState: PropTypes.shape({
    cookieConsent: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

MagicLogin.defaultProps = {
  router: null,
  authenticatorState: null,
  magicLoginState: null,
  className: null,
};

export default withRouter(MagicLogin);
