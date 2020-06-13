import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from 'gg-components/FormBuilder';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'helpers/regexConstants';

const LoginForm = props => {
  const { className, credentials, onDataChanged, ...rest } = props;

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  const onDataChangedCustom = newValue => {
    if (!newValue.email) {
      onDataChanged(newValue);
    }
    const newEmail = newValue.email.split(' ').join('');
    onDataChanged({ ...newValue, email: newEmail });
  };

  return (
    <FormBuilder
      onDataChanged={onDataChangedCustom}
      entity={credentials}
      submitLabel={credentials.useMagicLink ? 'Request magic link' : 'Login'}
      preSubmitText="An email containing a login link will be sent to you. To access your account, follow the link in the email."
      formFields={[
        {
          id: 'email',
          name: 'Email',
          validationRegex: EMAIL_REGEX,
          show: true,
          inputProps: {
            spellcheck: 'false',
            autofill: 'email',
          },
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
};

LoginForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LoginForm.defaultProps = {
  className: null,
};

export default LoginForm;
