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
import Ticket from 'components/Ticket';
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
    this.props.loadPC();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      pc,
      loadingPC,
      loadPCSuccess,
      loadPCError,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <LoggedInOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('ticket')}
        >
          <LoadingCover
            loadingSkeleton={Skeleton}
            loading={loadingPC || userLoading}
            error={loadPCError}
          >
            {pc && pc.ticket && (
              <Section name="Your EPICC 2019 ticket">
                <Ticket email={user.email} ticket={pc.ticket} />
              </Section>
            )}
            {!pc ||
              (!pc.ticket && <SubSection name="Failed to load ticket." />)}
          </LoadingCover>
        </LoggedInOnly>
        <DebugObject
          debugTitle="Profile Completion Status"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            loadingPC,
            loadPCSuccess,
            loadPCError,
            className,
          }}
        />
      </div>
    );
  }
}

TicketStatus.propTypes = {
  linkToSwap: PropTypes.bool,
  linkToPay: PropTypes.bool,
};
TicketStatus.defaultProps = { linkToSwap: true, linkToPay: true };
