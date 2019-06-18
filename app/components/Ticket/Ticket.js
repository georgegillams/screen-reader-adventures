import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';
import { cssModules } from 'bpk-react-utils';

import STYLES from './ticket.scss';

import PAGE_STYLES from 'containers/pages.scss';

const getClassName = cssModules({ ...PAGE_STYLES, ...STYLES }); // REGEX_REPLACED

class Ticket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, email, ticket, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('ticket__outer')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const ticketValue = JSON.stringify(ticket)
      .split('"')
      .join("'");
    // const imageUrl = `https://qrcode.online/img/?type=text&size=10&data=${ticketValue}`;

    return (
      <div>
        <span>{`Email: ${email}`}</span>
        <br />
        <br />
        <QRCode
          className={getClassName('ticket__qr')}
          bgColor="#FFFFFF"
          fgColor="#1e1e1e"
          level="Q"
          value={ticketValue}
        />
      </div>
    );
  }
}

Ticket.propTypes = {
  email: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Ticket.defaultProps = {
  className: null,
};

export default Ticket;
