import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import Skeleton from './Skeleton';
import LowerPageSkeleton from './LowerPageSkeleton';
import { getTimeDifference } from 'helpers/time';
import { DebugObject, LoadingCover, LoggedInOnly } from 'components/Auth';
import {
  SignUpContinueFormAboutYou,
  SignUpContinueFormYourDegree,
  SignUpContinueFormYourRequirements,
  SignUpContinueFormPhotoRelease,
  SignUpContinueFormPayment,
} from 'components/Forms';
import TicketStatus from 'containers/TicketStatus';
import { CookiesOnly } from 'components/Sessions';
import { STRIPE_PUBLIC_API_KEY } from 'helpers/constants';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkThemeProvider from 'bpk-theming';
import BpkProgressBar, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import { Elements, StripeProvider } from 'react-stripe-elements';

import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED



export default class StripePayments extends React.Component {
  render() {
    const {
      setLoginRedirect,
      cookiesAllowed,
      user,
      loadingBalance,
      balance,
      loadBalanceSuccess,
      loadBalanceError,
      onCookiesAccepted,
      updateUserDetails,
      userDetails,
      userDetailsChanged,
      updatingUserDetails,
      updateUserDetailsSuccess,
      updateUserDetailsError,
      loadUserDetails,
      loadingUserDetails,
      loadUserDetailsSuccess,
      loadUserDetailsError,
      paymentTokenChanged,
      makePayment,
      makingPayment,
      makePaymentSuccess,
      makePaymentError,
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
          setLoginRedirect={() => {
            setLoginRedirect('Pay');
          }}
        >
          <TicketStatus linkToPay={false} />
          <LoadingCover
            loadingSkeleton={LowerPageSkeleton}
            loading={loadingUserDetails || loadingBalance}
            error={loadUserDetailsError || loadBalanceError}
          >
            {loadBalanceSuccess && (
              <Section
                name={
                  balance > 0
                    ? `Pay balance of £${balance / 100}`
                    : 'No outstanding balance'
                }
              >
                <StripeProvider apiKey={STRIPE_PUBLIC_API_KEY}>
                  <Elements>
                    <SignUpContinueFormPayment
                      presubmitText="Please note, all EPICC tickets are non-refundable."
                      disabled={updatingUserDetails || makingPayment}
                      user={user}
                      balance={balance}
                      userDetails={{
                        ...userDetails,
                        email: user ? user.email : '',
                      }}
                      onDataChanged={newValue => {
                        userDetailsChanged(newValue);
                      }}
                      onSubmit={arg => {
                        const tokenId = arg.id;
                        paymentTokenChanged(tokenId);
                        makePayment();
                      }}
                    />
                  </Elements>
                </StripeProvider>
              </Section>
            )}
          </LoadingCover>
        </LoggedInOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title={'Pay'} />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loadingUserDetails}
          error={loadUserDetailsError || loadBalanceError}
        >
          {page}
          <DebugObject
            debugTitle="Pay"
            debugObject={{
              cookiesAllowed,
              onCookiesAccepted,
              updateUserDetails,
              userDetails,
              userDetailsChanged,
              updatingUserDetails,
              updateUserDetailsSuccess,
              updateUserDetailsError,
              loadUserDetails,
              loadingUserDetails,
              loadUserDetailsSuccess,
              loadUserDetailsError,
              paymentTokenChanged,
              makePayment,
              makePaymentSuccess,
              makePaymentError,
            }}
          />
        </LoadingCover>
      </Fragment>
    );
  }
}

StripePayments.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
