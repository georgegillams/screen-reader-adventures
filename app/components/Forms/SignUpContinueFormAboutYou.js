import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import { TextLink } from 'components/Typography';
import GGButton from 'components/GGButton';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  NAME_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class SignUpContinueFormAboutYou extends React.Component {
  static propTypes = {
    userDetails: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, userDetails, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={userDetails}
        submitLabel="Continue"
        formFields={[
          {
            id: 'email',
            name: 'Email',
            disabled: true,
            validationRegex: /.*/,
            show: true,
          },
          {
            id: 'name',
            name: 'Name',
            validationRegex: NAME_REGEX,
            show: true,
          },
          {
            id: 'surname',
            name: 'Surname',
            validationRegex: NAME_REGEX,
            show: true,
          },
          {
            id: 'returningDelegate',
            name: 'I have attended EPICC before',
            type: 'CHECKBOX',
            validationRegex: null,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default SignUpContinueFormAboutYou;
