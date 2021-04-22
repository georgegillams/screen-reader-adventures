import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DebugObject } from 'components/common/DebugObject';
import { CONSENT_STATE_ALLOWED } from 'containers/common/Consent/constants';
import { detect } from 'detect-browser';
import { withRouter } from 'next/router';

const Analytics = props => {
  const [analytic, setAnalytic] = useState(null);
  const [analyticSent, setAnalyticSent] = useState(false);

  const {
    router,

    sendAnalytic,

    analyticState,
    consentState,

    className,
  } = props;

  const constructAnalytic = () => {
    if (!router) {
      return null;
    }
    let utm_medium;
    let utm_source;
    let url;
    let browser;
    let browserVersion;
    let os;

    const detectResult = detect();
    if (detectResult) {
      browser = detectResult.name;
      browserVersion = detectResult.version;
      os = detectResult.os;
    }
    if (router) {
      url = router.pathname;
      if (router.query) {
        utm_medium = router.query.utm_medium;
        utm_source = router.query.utm_source;
      }
    }
    return {
      type: 'SPA_LOAD',
      url,
      utm_source,
      utm_medium,
      browser,
      browserVersion,
      os,
    };
  };

  useEffect(() => {
    // Create the analytic data as soon as the container loads...
    const newAnalytic = constructAnalytic();
    if (!analytic) {
      setAnalytic(newAnalytic);
    }
    const analyticToSend = analytic || newAnalytic;
    // ... but wait to send it until we have consent
    if (analyticToSend && !analyticSent && consentState.cookieConsent === CONSENT_STATE_ALLOWED) {
      sendAnalytic(analyticToSend);
      setAnalyticSent(true);
    }
  }, [consentState]);

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <DebugObject
        debugTitle="Analytics"
        debugObject={{
          sendAnalytic,
          analyticState,
          consentState,
          className,
        }}
      />
    </div>
  );
};

Analytics.propTypes = {
  router: PropTypes.object,
  sendAnalytic: PropTypes.func.isRequired,
  consentState: PropTypes.shape({
    cookieConsent: PropTypes.string,
  }).isRequired,
  analyticState: PropTypes.shape({
    sending: PropTypes.bool,
    sendError: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
};

Analytics.defaultProps = {
  router: null,
  className: null,
};

export default withRouter(Analytics);
