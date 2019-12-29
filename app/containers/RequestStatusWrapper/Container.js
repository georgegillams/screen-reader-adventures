import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cookie from 'react-cookies';
import { cssModules } from 'bpk-react-utils';

import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import {RequestStatusContainer} from 'gg-components/dist/RequestStatus';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class RequestStatusWrapper extends React.Component {
  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.props.purgeMessages();
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    const { messages, ...rest } = this.props;

    return <RequestStatusContainer statuses={messages} />;
  }
}

RequestStatusWrapper.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
