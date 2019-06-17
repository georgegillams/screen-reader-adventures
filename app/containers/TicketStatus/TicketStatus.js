import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkThemeProvider from 'bpk-theming';
import BpkCard from 'bpk-component-card';
import BpkProgressBar, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { getTimeDifference } from 'helpers/time';
import { beautifyTicketType } from 'helpers/ticketing';
import { DebugObject, LoadingCover, LoggedInOnly } from 'components/Auth';
import {
  SignUpContinueFormAboutYou,
  SignUpContinueFormYourDegree,
  SignUpContinueFormYourRequirements,
  SignUpContinueFormPhotoRelease,
  SignUpContinueFormPayment,
} from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import { STRIPE_PUBLIC_API_KEY } from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MIN_PAGE_NUMBER = 1;
const MAX_PAGE_NUMBER = 5;
const PAYMENT_PAGE_NUMBER = MAX_PAGE_NUMBER;

export default class TicketStatus extends React.Component {
  componentDidMount = () => {
    this.props.loadUserTicket();
    this.props.loadBalance();
  };

  render() {
    const {
      loadingBalance,
      balance,
      loadBalanceSuccess,
      loadBalanceError,
      loadingUserTicket,
      userTicket,
      loadUserTicketSuccess,
      loadUserTicketError,
      linkToSwap,
      linkToPay,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const balanceOnAccount = balance > 0;

    return (
      <Fragment>
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loadingUserTicket || loadingBalance}
          error={loadUserTicketError || loadBalanceError}
        >
          <BpkCard>
            {userTicket && (
              <Section
                name={`Ticket ${balanceOnAccount ? 'reserved ⏱' : 'purchased'}`}
              >
                {balanceOnAccount ? (
                  `Your ticket will be reserved for approximately ${getTimeDifference(
                    userTicket.reservedUntil,
                    true,
                  )}. Please make payment within this time to avoid losing your place at EPICC 2019!`
                ) : (
                  <div>
                    A payment receipt has been sent to your email address. If
                    you don&apos;t see it, please check your junk folder.
                    <br />
                    We look forward to seeing you at EPICC 2019!
                  </div>
                )}
                <br />
                <br />
                {`Ticket type ${beautifyTicketType(userTicket.ticketType)}`}
                {balanceOnAccount && (
                  <Fragment>
                    <br />
                    Remaining balance: £{balance / 100}
                  </Fragment>
                )}
              </Section>
            )}
            {!userTicket && (
              <Section name="You currently have no ticket reserved">
                The ticket you reserved when you created your account may have
                been purchased by another user.
                <br />
                If tickets are still available you may reserve another.
              </Section>
            )}
            {(!userTicket || balanceOnAccount) && linkToSwap && (
              <Fragment>
                <GGButton href="/swap-ticket" large>
                  {userTicket ? 'Change ticket type' : 'Reserve a ticket'}
                </GGButton>
              </Fragment>
            )}
          </BpkCard>
        </LoadingCover>
        <DebugObject
          debugTitle="TicketStatus"
          debugObject={{
            loadingUserTicket,
            userTicket,
            loadUserTicketSuccess,
            loadUserTicketError,
            className,
          }}
        />
      </Fragment>
    );
  }
}

TicketStatus.propTypes = {
  linkToSwap: PropTypes.bool,
  linkToPay: PropTypes.bool,
};
TicketStatus.defaultProps = { linkToSwap: true, linkToPay: true };
