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
import { DebugObject, LoggedInOnly, LoadingCover } from 'components/Auth';
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
      success,
      error,
      requestVerificationEmail,
      requestingVerificationEmail,
      requestingSuccess,
      requestingError,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [getClassName('pages__container')];

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
                <GGButton large onClick={requestVerificationEmail}>
                  Request new verification email
                </GGButton>
                <br />
                <br />
              </Fragment>
            )}
            {PROJECT_NAME === 'EPICC' && (
              <Fragment>
                <GGButton large href="/sign-up/continue?page=1">
                  {'View/edit details'}
                </GGButton>
                <br />
                <br />
              </Fragment>
            )}
            <GGButton large onClick={logout}>
              Logout
            </GGButton>
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
            success,
            error,
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Account.defaultProps = {
  loggingIn: false,
  error: null,
  createdPayment: null,
  className: null,
};
