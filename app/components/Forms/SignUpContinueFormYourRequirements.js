import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import {Button} from 'gg-components/dist/Button';
import { TextLink } from 'gg-components/dist/Typography';
import {
  STRING_REGEX,
  INT_REGEX,
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class SignUpContinueFormYourRequirements extends React.Component {
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
            id: 'dietaryRequirements',
            name: 'Dietary requirements',
            validationRegex: STRING_REGEX,
            show: true,
          },
          {
            id: 'alergies',
            name: 'Alergies',
            validationRegex: STRING_REGEX,
            show: true,
          },
          {
            id: 'otherRequirements',
            name:
              'Do you have any accessibility requirements for the conference?',
            validationRegex: STRING_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default SignUpContinueFormYourRequirements;
