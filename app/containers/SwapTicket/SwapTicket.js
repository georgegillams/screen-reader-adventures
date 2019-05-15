import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { SignUpForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import Redirect from 'components/Redirect';
import TicketOptions from 'containers/TicketOptions';
import TicketStatus from 'containers/TicketStatus';

import Skeleton from './Skeleton';
import LowerPageSkeleton from './LowerPageSkeleton';
import { LoggedInOnly, LoadingCover } from 'components/Auth';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';

import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED



export default class SwapTickets extends React.Component {
  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      swapTickets,
      selectedTicketType,
      selectTicketType,
      loadingAvailableTickets,
      loadTicketsError,
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
          setLoginRedirect={() => setLoginRedirect('swap-ticket')}
        >
          <TicketStatus linkToSwap={false} />
          <LoadingCover
            loadingSkeleton={LowerPageSkeleton}
            loading={loadingAvailableTickets}
            error={loadTicketsError}
          >
            <Section name="Reserve a new ticket">
              <TicketOptions
                onSelect={selectTicketType}
                selectedTicketType={selectedTicketType}
              />
              <GGButton
                disabled={!selectedTicketType}
                large
                onClick={swapTickets}
              >
                Confirm selection
              </GGButton>
              <br />
            </Section>
          </LoadingCover>
        </LoggedInOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Reserve a new ticket" />
        <LoadingCover loadingSkeleton={Skeleton} loading={userLoading}>
          {page}
        </LoadingCover>
      </Fragment>
    );
  }
}

SwapTickets.propTypes = {
  signingUp: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  signUp: PropTypes.func.isRequired,
  className: PropTypes.string,
};
