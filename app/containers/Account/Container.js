import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import {
  DebugObject,
  LoggedInOnly,
  LoadingCover,
} from 'gg-components/dist/Auth';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
  PROJECT_NAME,
  EMAIL_VERIFICATION_ENABLED,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Account extends React.Component {
  componentWillMount = () => {};

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
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoggedInOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('account')}
        >
          <Section name="Account">
            {user && user.email && <div>{`Email: ${user.email}`}</div>}
            {user && user.uname && <div>{`Display name: ${user.uname}`}</div>}
            <br />
            {user && !user.emailVerified && EMAIL_VERIFICATION_ENABLED && (
              <Fragment>
                <Button large onClick={requestVerificationEmail}>
                  Request new verification email
                </Button>
                <br />
                <br />
              </Fragment>
            )}
            {PROJECT_NAME === 'EPICC' && (
              <Fragment>
                <Button large href="/sign-up/continue?page=1">
                  {'View/edit details'}
                </Button>
                <br />
                <br />
              </Fragment>
            )}
            <Button large onClick={logout}>
              Logout
            </Button>
          </Section>
        </LoggedInOnly>
      </div>
    );

    return (
      <Fragment>
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
      </Fragment>
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
