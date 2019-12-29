import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/dist/Input';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import { Button } from 'gg-components/dist/Button';
import { TextLink } from 'gg-components/dist/Typography';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
  SORT_CODE_REGEX,
  MONZOME_LINK_REGEX,
} from 'helpers/constants';

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
    const { className, credentials, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={credentials}
        submitLabel={credentials.useMagicLink ? 'Request magic link' : 'Login'}
        presubmitText="An email containing a login link will be sent to you. To access your account, follow the link in the email."
        formFields={[
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,
            show: true,
          },
          {
            id: 'password',
            name: 'Password',
            validationRegex: PASSWORD_REGEX,
            showCondition: !credentials.useMagicLogin,
            show: !credentials.useMagicLink,
          },
          {
            id: 'useMagicLink',
            name: 'Use magic link',
            type: 'CHECKBOX',
            validationRegex: null,
            show: false,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default Login;
