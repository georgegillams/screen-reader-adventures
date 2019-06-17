import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import {
  STRING_REGEX,
  INT_REGEX,
  DECIMAL_REGEX,
  SORT_CODE_REGEX,
  MONZOME_LINK_REGEX,
} from 'helpers/constants';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class CreatePayment extends React.Component {
  static propTypes = {
    payment: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, payment, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={payment}
        submitLabel="Create payment"
        formFields={[
          {
            id: 'amount',
            name: 'Amount',
            validationRegex: DECIMAL_REGEX,
            show: true,
          },
          {
            id: 'reference',
            name: 'Reference/name',
            validationRegex: STRING_REGEX,
            show: true,
          },
          {
            id: 'monzoMeLink',
            name: 'Monzo.me link',
            validationRegex: MONZOME_LINK_REGEX,
            show: true,
          },
          {
            id: 'sortCode',
            name: 'Sort code',
            validationRegex: SORT_CODE_REGEX,
            show: true,
          },
          {
            id: 'accountNumber',
            name: 'Account number',
            validationRegex: INT_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default CreatePayment;
