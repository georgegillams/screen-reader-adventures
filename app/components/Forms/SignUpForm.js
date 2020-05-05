import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/Input';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import {Button} from 'gg-components/Button';
import { TextLink } from 'gg-components/Typography';
import { USERNAMES_ENABLED, UNAME_REGEX, EMAIL_REGEX } from 'helpers/constants';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class Login extends React.Component {
  static propTypes = {
    credentials: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, credentials, submitLabel, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={credentials}
        submitLabel={submitLabel || 'Sign up'}
        formFields={[
          {
            id: 'uname',
            name: 'Display name',
            validationRegex: UNAME_REGEX,
            show: USERNAMES_ENABLED,
          },
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default Login;
