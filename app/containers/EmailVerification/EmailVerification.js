import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import { LoginForm } from 'components/Forms';
import { DebugObject } from 'gg-components/dist/Auth';
import { CookiesOnly } from 'components/Sessions';
import { GGRedirect } from 'gg-components/dist/Redirect';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class EmailVerification extends React.Component {
  componentDidMount = () => {
    const interval = setInterval(() => {
      const tokenValue = new URL(window.location).searchParams.get('token');
      this.props.tokenChanged(tokenValue);
      if (this.props.cookiesAllowed) {
        this.props.verify();
        clearInterval(interval);
      }
    }, 200);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      tokenChanged,
      verify,
      user,
      verifying,
      verifySuccess,
      verifyError,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (verifySuccess) {
      return (
        <GGRedirect
          className={outerClassNameFinal.join(' ')}
          to="/account"
          name="Thanks for verifying your email"
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Email verification" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
          }}
        />
        <Section name="Email verification">
          {verifySuccess && <span>Thanks for verifying your email!</span>}
        </Section>
        <DebugObject
          debugTitle="Email verification"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            tokenChanged,
            verify,
            user,
            verifying,
            verifySuccess,
            verifyError,
          }}
        />
      </div>
    );
  }
}

EmailVerification.propTypes = {
  verifying: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  verify: PropTypes.func.isRequired,
  className: PropTypes.string,
};
