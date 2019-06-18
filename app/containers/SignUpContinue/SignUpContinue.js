import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkThemeProvider from 'bpk-theming';
import BpkProgressBar, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
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
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MIN_PAGE_NUMBER = 1;
const MAX_PAGE_NUMBER = 5;
const PAYMENT_PAGE_NUMBER = MAX_PAGE_NUMBER;

export default class SignUpContinue extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pageNumber: 1 };
  }

  updatePageNumber = (newPageNumber, setUrl = true) => {
    this.setState({ pageNumber: newPageNumber });
    if (setUrl) {
      window.history.pushState(
        {},
        '',
        `/sign-up/continue?page=${newPageNumber}`,
      );
    }
  };

  componentWillMount = () => {
    this.props.loadUserDetails();
    const pageNumber = new URL(window.location).searchParams.get('page');
    if (pageNumber) {
      this.updatePageNumber(pageNumber, false);
    } else {
      this.updatePageNumber(MIN_PAGE_NUMBER);
    }
  };

  render() {
    const {
      setLoginRedirect,
      cookiesAllowed,
      user,
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
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const pageNumber = parseInt(this.state.pageNumber, 10);

    if (pageNumber > MAX_PAGE_NUMBER) {
      this.updatePageNumber(MAX_PAGE_NUMBER);
    }
    if (pageNumber < MIN_PAGE_NUMBER) {
      this.updatePageNumber(MIN_PAGE_NUMBER);
    }

    if (pageNumber === PAYMENT_PAGE_NUMBER) {
      window.location = '/pay';
    }

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let Form = SignUpContinueFormAboutYou;
    let title = 'Sign up';
    switch (pageNumber) {
      case 1:
        title = 'About you';
        Form = SignUpContinueFormAboutYou;
        break;
      case 2:
        title = 'University';
        Form = SignUpContinueFormYourDegree;
        break;
      case 3:
        title = 'Requirements';
        Form = SignUpContinueFormYourRequirements;
        break;
      case 4:
        title = 'Photo release';
        Form = SignUpContinueFormPhotoRelease;
        break;
      case 5:
        title = 'Payment';
        Form = null;
        break;
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <LoggedInOnly
          user={user}
          setLoginRedirect={() => {
            setLoginRedirect('sign-up/continue');
          }}
        >
          <TicketStatus />
          <Section name={title}>
            <BpkThemeProvider
              theme={{ progressBarFillColor: '#e02626' }}
              themeAttributes={[...progressThemeAttributes]}
            >
              <BpkProgressBar
                className={getClassName('pages__component')}
                small
                min={MIN_PAGE_NUMBER}
                max={MAX_PAGE_NUMBER + 1}
                value={pageNumber}
                aria-label="Sign up progress"
              />
            </BpkThemeProvider>
            <Form
              disabled={updatingUserDetails}
              user={user}
              userDetails={{
                ...userDetails,
                email: user ? user.email : '',
              }}
              onDataChanged={newValue => {
                userDetailsChanged(newValue);
              }}
              onSubmit={arg => {
                updateUserDetails();
                if (pageNumber < MAX_PAGE_NUMBER) {
                  this.updatePageNumber(pageNumber + 1);
                }
              }}
            />
          </Section>
        </LoggedInOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title={title} />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loadingUserDetails}
          error={loadUserDetailsError}
        >
          {page}
          <DebugObject
            debugTitle="Sign up continue"
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
            }}
          />
        </LoadingCover>
      </Fragment>
    );
  }
}

SignUpContinue.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
