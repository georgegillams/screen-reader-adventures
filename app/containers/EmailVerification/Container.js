import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PageTitle } from 'gg-components/Typography';
import { DebugObject } from 'gg-components/Auth';
import { Redirect } from 'gg-components/Redirect';

export default class EmailVerification extends React.Component {
  componentDidMount = () => {
    const interval = setInterval(() => {
      const tokenValue = new URL(window.location).searchParams.get('token');
      if (this.props.cookiesAllowed) {
        this.props.verifyEmail(tokenValue);
        clearInterval(interval);
      }
    }, 200);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      user,
      verifyEmail,
      verifying,
      verifySuccess,
      verifyError,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (verifySuccess) {
      return (
        <Redirect
          className={outerClassNameFinal.join(' ')}
          to="/account"
          name="Thanks for verifying your email"
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="Email verification" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
          }}
        />
        <PageTitle name="Email verification">
          {verifySuccess && <span>Thanks for verifying your email!</span>}
        </PageTitle>
        <DebugObject
          debugTitle="Email verification"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            verifyEmail,
            user,
            verifying,
            verifySuccess,
            verifyError,
          }}
        />
      </div>
    );
  }
}

EmailVerification.propTypes = {
  verifying: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  verifyEmail: PropTypes.func.isRequired,
  className: PropTypes.string,
};
