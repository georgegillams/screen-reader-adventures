import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Button } from 'gg-components/Button';
import { Paragraph, PageTitle } from 'gg-components/Typography';
import { DebugObject, LoggedInOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { CookiesOnly } from 'components/Sessions';

export default class Account extends React.Component {
  render() {
    const {
      setLoginRedirect,
      cookiesAllowed,
      onCookiesAccepted,
      logout,
      user,
      userLoading,
      loggingOut,
      loggingOutSuccess,
      loggingOutError,
      requestVerificationEmail,
      requestingVerificationEmail,
      requestingSuccess,
      requestingError,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <LoggedInOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('account')}
        >
          <PageTitle name="Account">
            <Paragraph>
              {user && user.email && <div>{`Email: ${user.email}`}</div>}
              {user && user.uname && <div>{`Display name: ${user.uname}`}</div>}
              <br />
            </Paragraph>
            {user && !user.emailVerified && (
              <>
                <Button large onClick={requestVerificationEmail}>
                  Request new verification email
                </Button>
                <br />
                <br />
              </>
            )}
            {user && user.admin && (
              <>
                <Button large href="/admin">
                  Admin
                </Button>
                <br />
                <br />
                <Button large href="/status">
                  Site status
                </Button>
                <br />
                <br />
              </>
            )}
            <Button large onClick={logout}>
              Logout
            </Button>
          </PageTitle>
        </LoggedInOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Account" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={onCookiesAccepted}
        />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!cookiesAllowed || userLoading}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Account"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            logout,
            user,
            userLoading,
            loggingOut,
            loggingOutSuccess,
            loggingOutError,
            requestVerificationEmail,
            requestingVerificationEmail,
            requestingSuccess,
            requestingError,
          }}
        />
      </>
    );
  }
}

Account.propTypes = {
  loggingIn: PropTypes.bool,
  loggingOutError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Account.defaultProps = {
  loggingIn: false,
  loggingOutError: null,
  createdPayment: null,
  className: null,
};
