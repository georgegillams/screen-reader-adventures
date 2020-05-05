import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cookie from 'react-cookies';
import { cssModules } from 'bpk-react-utils';
import { detect } from 'detect-browser';
const queryString = require('query-string');

import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { DebugObject } from 'gg-components/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

class Analytics extends React.Component {
  componentDidMount = () => {
    let utm_medium, utm_source, url, browser, browserVersion, os;
    const detectResult = detect();
    if (detectResult) {
      browser = detectResult.name;
      browserVersion = detectResult.version;
      os = detectResult.os;
    }
    const location = this.props.location;
    if (location) {
      url = location.pathname;
      const search = location.search;
      if (search) {
        const parsedSearch = queryString.parse(search);
        utm_medium = parsedSearch.utm_medium;
        utm_source = parsedSearch.utm_source;
      }
    }
    this.props.send({
      type: 'SPA_LOAD',
      url,
      utm_source,
      utm_medium,
      browser,
      browserVersion,
      os,
    });
  };

  render() {
    const {
      location,
      cookiesAllowed,
      setCookiesAllowed,
      analytic,
      send,
      sending,
      sendSuccess,
      sendError,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <DebugObject
          debugTitle="Analytics"
          debugObject={{
            location,
            cookiesAllowed,
            setCookiesAllowed,
            analytic,
            send,
            sending,
            sendSuccess,
            sendError,
            className,
          }}
        />
      </div>
    );
  }
}

Analytics.propTypes = {
  cookiesAllowed: PropTypes.bool,
  sending: PropTypes.bool,
  sendError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default withRouter(Analytics);
