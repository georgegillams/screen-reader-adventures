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
  NAME_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class SignUpContinueFormYourDegree extends React.Component {
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
            id: 'university',
            name: 'University',
            validationRegex: NAME_REGEX,
            show: true,
          },
          {
            id: 'degreeCourse',
            name: 'Degree course',
            validationRegex: STRING_REGEX,
            show: true,
          },
          {
            id: 'yearOfStudy',
            name: 'Year of study',
            validationRegex: INT_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default SignUpContinueFormYourDegree;
