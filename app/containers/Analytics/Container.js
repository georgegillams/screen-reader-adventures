import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';
import { DebugObject } from 'gg-components/Auth';

const queryString = require('query-string');

class Analytics extends React.Component {
  componentDidMount = () => {
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
    const { location } = this.props;
    if (location) {
      url = location.pathname;
      const { search } = location;
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
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
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

export default withRouter(Analytics);
