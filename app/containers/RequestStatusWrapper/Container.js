import React from 'react';
import PropTypes from 'prop-types';
import { RequestStatusContainer } from 'gg-components/RequestStatus';

import { PROJECT_UNDER_TEST } from 'helpers/constants';

export default class RequestStatusWrapper extends React.Component {
  componentDidMount = () => {
    this.interval = setInterval(() => {
      if (this.props.messages && this.props.messages.length > 0) {
        this.props.purgeMessages();
      }
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    const { messages } = this.props;

    if (PROJECT_UNDER_TEST) {
      return null;
    }

    return <RequestStatusContainer statuses={messages} />;
  }
}

RequestStatusWrapper.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
