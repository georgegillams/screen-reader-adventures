import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PageTitle } from 'gg-components/Typography';

import PaymentForm from 'containers/PaymentForm';

export default class PaymentsPage extends React.Component {
  render() {
    const { className } = this.props;
    const classNames = [];

    if (className) {
      classNames.push(className);
    }

    return (
      <div className={classNames.join(' ')}>
        <Helmet title="Payments" />
        <PageTitle name="Send me money">
          <PaymentForm />
        </PageTitle>
      </div>
    );
  }
}

PaymentsPage.propTypes = {
  className: PropTypes.string,
};
