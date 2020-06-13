import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { TextLink, PageTitle } from 'gg-components/Typography';
import { Redirect } from 'gg-components/Redirect';
import { LoggedOutOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { CookiesOnly } from 'components/Sessions';
import { SignUpForm } from 'components/Forms';

export default class SignUp extends React.Component {
  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      user,
      userLoading,
      signUp,
      credentials,
      setCredentials,
      signingUp,
      signUpSuccess,
      signUpError,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (signUpSuccess) {
      return (
        <Redirect className={outerClassNameFinal.join(' ')} to="/account" />
      );
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <LoggedOutOnly user={user}>
          <PageTitle name="Sign up">
            <SignUpForm
              disabled={signingUp}
              credentials={credentials || {}}
              onDataChanged={setCredentials}
              onSubmit={signUp}
            />
            <br />
            <TextLink to="/login">Already got an account? Login here.</TextLink>
          </PageTitle>
        </LoggedOutOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Sign up" />
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
      </>
    );
  }
}

SignUp.propTypes = {
  signingUp: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  signUp: PropTypes.func.isRequired,
  className: PropTypes.string,
};
