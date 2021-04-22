import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DebugObject } from 'components/common/DebugObject';
import {
  CONSENT_STATE_UNSET,
  CONSENT_STATE_ALLOWED,
  CONSENT_STATE_ALLOWED_CLIENT_VALUE,
  CONSENT_STATE_DEFERRED_CLIENT_VALUE,
} from './constants';
import Button from 'components/common/Button';
import { Paragraph } from 'gg-components/Paragraph';
import Modal from 'react-modal';
import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './consent.scss';
import { getPrivacyPreferences, setPrivacyPreferences } from 'client-utils/common/storageHelpers';
import TextLink from 'components/common/TextLink';
import Banner from './Banner';
import { Section } from 'gg-components/Section';

const getClassName = cssModules(STYLES);

const Consent = props => {
  const {
    consent,
    deferConsent,
    resetConsent,

    consentState,

    ...rest
  } = props;

  const test = process.env.NODE_ENV === 'test';

  useEffect(() => {
    if (!test) {
      Modal.setAppElement('#__next');
    }
    const privacyPreferences = getPrivacyPreferences();
    if (privacyPreferences === CONSENT_STATE_DEFERRED_CLIENT_VALUE) {
      deferConsent();
    } else if (privacyPreferences === CONSENT_STATE_ALLOWED_CLIENT_VALUE) {
      consent();
    } else {
      resetConsent();
    }
  }, []);

  let showBanner = false;
  let showModal = false;
  if (consentState.cookieConsent === CONSENT_STATE_UNSET && !consentState.cookieConsentReason) {
    showBanner = true;
  }
  if (consentState.cookieConsent !== CONSENT_STATE_ALLOWED && !!consentState.cookieConsentReason) {
    showModal = true;
  }

  const consentChildren = (
    <>
      <Section
        className={getClassName(
          'consent__section',
          !!showBanner && 'consent__section--banner',
          !!showModal && 'consent__section--modal'
        )}
        textClassName={getClassName('consent__section-text')}
        padding={false}
        name="Privacy and cookies">
        <Paragraph>
          To provide the best possible experience, we would like to use cookies and handle your data in accordance with
          our <TextLink href="/privacy-policy">Privacy policy</TextLink>.
          <br />
          {consentState.cookieConsentReason && (
            <>
              <br />
              You must accept usage of cookies and data to {consentState.cookieConsentReason}.
            </>
          )}
        </Paragraph>
      </Section>
      <div>
        <Button
          className={getClassName('consent__button')}
          onClick={() => {
            setPrivacyPreferences(CONSENT_STATE_ALLOWED_CLIENT_VALUE);
            consent();
          }}>
          Accept
        </Button>
        <Button
          className={getClassName('consent__button')}
          onClick={() => {
            deferConsent();
            setPrivacyPreferences(CONSENT_STATE_DEFERRED_CLIENT_VALUE);
          }}
          href={consentState.cookieConsentReason ? '/' : null}>
          {consentState.cookieConsentReason ? 'Dismiss and go to home page' : 'Dismiss'}
        </Button>
      </div>
    </>
  );

  let cookieConsentComponent = null;
  if (showBanner) {
    cookieConsentComponent = <Banner>{consentChildren}</Banner>;
  }
  if (showModal) {
    // Show modal
    cookieConsentComponent = (
      <Modal
        isOpen
        ariaHideApp
        overlayClassName={getClassName('consent__modal-overlay')}
        className={getClassName('consent__modal-content')}>
        {consentChildren}
      </Modal>
    );
  }

  return (
    <div {...rest}>
      <DebugObject
        debugTitle="Consent"
        debugObject={{
          consent,
          deferConsent,
          consentState,
        }}
      />
      {cookieConsentComponent && cookieConsentComponent}
    </div>
  );
};

Consent.propTypes = {
  test: PropTypes.bool,
  consent: PropTypes.func.isRequired,
  deferConsent: PropTypes.func.isRequired,
  resetConsent: PropTypes.func.isRequired,
  consentState: PropTypes.shape({
    cookieConsent: PropTypes.string,
    cookieConsentReason: PropTypes.string,
  }).isRequired,
};

Consent.defaultProps = {
  test: false,
};

export default Consent;
