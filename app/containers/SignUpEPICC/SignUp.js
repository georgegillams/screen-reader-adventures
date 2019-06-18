import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import TicketOptions from '../TicketOptions';

import Skeleton from './Skeleton';

import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import { NotificationComp } from 'components/Notifications';
import CodeInline from 'components/Code';
import { SignUpForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import Redirect from 'components/Redirect';
import { LoggedOutOnly, LoadingCover } from 'components/Auth';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class SignUp extends React.Component {
  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      credentialsChanged,
      credentials,
      ticketSelectionConfirmed,
      signUp,
      user,
      userLoading,
      signingUp,
      signUpSuccess,
      signUpError,
      selectedTicketType,
      selectTicketType,
      setTicketSelectionConfirmed,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (signUpSuccess) {
      return (
        <Redirect
          className={outerClassNameFinal.join(' ')}
          to="/sign-up/continue?page=1"
        />
      );
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoggedOutOnly user={user}>
          <Section name="Sign up">
            {!ticketSelectionConfirmed && (
              <Fragment>
                <TicketOptions
                  selectedTicketType={selectedTicketType}
                  onSelect={selectTicketType}
                />
                <br />
                <GGButton
                  large
                  onClick={() => setTicketSelectionConfirmed(true)}
                  disabled={!selectedTicketType}
                >
                  Continue
                </GGButton>
                <br />
              </Fragment>
            )}
            {ticketSelectionConfirmed && (
              <SignUpForm
                submitLabel="Continue"
                disabled={signingUp || !selectedTicketType}
                credentials={credentials}
                onDataChanged={credentialsChanged}
                onSubmit={signUp}
              />
            )}
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
