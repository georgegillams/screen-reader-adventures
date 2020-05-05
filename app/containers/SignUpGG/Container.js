import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import { Button } from 'gg-components/Button';
import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { CodeInline } from 'gg-components/Code';
import { SignUpForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import { GGRedirect } from 'gg-components/Redirect';
import { LoggedOutOnly, LoadingCover } from 'gg-components/Auth';
import { STRING_REGEX } from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

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
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (signUpSuccess) {
      return (
        <GGRedirect className={outerClassNameFinal.join(' ')} to="/account" />
      );
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoggedOutOnly user={user}>
          <Section name="Sign up">
            <SignUpForm
              disabled={signingUp}
              credentials={credentials || {}}
              onDataChanged={setCredentials}
              onSubmit={signUp}
            />
            <br />
            <TextLink to="/login">Already got an account? Login here.</TextLink>
          </Section>
        </LoggedOutOnly>
      </div>
    );

    return (
      <Fragment>
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
      </Fragment>
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
