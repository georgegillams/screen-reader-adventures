import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DebugObject } from 'components/common/DebugObject';

const CookiesRequired = props => {
  const { consentState, setConsentReason } = props;
  const { cookieConsent } = consentState;
  const { reason } = props;

  useEffect(() => {
    setConsentReason(reason);

    const cleanUp = () => {
      setConsentReason(null);
    };
    return cleanUp;
  }, [cookieConsent]);

  return (
    <DebugObject
      debugTitle="CookiesRequired"
      debugObject={{
        setConsentReason,
        consentState,
      }}
    />
  );
};

CookiesRequired.propTypes = {
  reason: PropTypes.string.isRequired,
  setConsentReason: PropTypes.func.isRequired,
  consentState: PropTypes.shape({
    cookieConsent: PropTypes.string,
  }).isRequired,
};

export default CookiesRequired;
