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
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { SignUpForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import Redirect from 'components/Redirect';
import ShopFloor from 'components/ShopFloor';
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
  componentWillMount = () => {
    this.props.loadAvailableTickets();
  };

  render() {
    const {
      selectedTicketType,
      onSelect,
      loadAvailableTickets,
      availableTickets,
      availableTicketsLoading,
      loadAvailableTicketsSuccess,
      loadAvailableTicketsError,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (availableTicketsLoading) {
      return <Skeleton />;
    }

    return (
      <ShopFloor
        ticketTypes={availableTickets}
        onSelect={onSelect}
        selectedTicket={selectedTicketType}
      />
    );
  }
}

SignUp.propTypes = {};
