import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from 'gg-components/FormBuilder';

import { USERNAME_REGEX, EMAIL_REGEX } from 'helpers/regexConstants';

const SignUpForm = props => {
  const { onDataChanged, credentials, submitLabel, ...rest } = props;

  const onDataChangedCustom = newValue => {
    if (!newValue || !newValue.email) {
      onDataChanged(newValue);
      return;
    }
    const newEmail = newValue.email.split(' ').join('');
    onDataChanged({ ...newValue, email: newEmail });
  };

  return (
    <FormBuilder
      onDataChanged={onDataChangedCustom}
      entity={credentials}
      submitLabel={submitLabel || 'Sign up'}
      formFields={[
        {
          id: 'uname',
          name: 'Display name',
          validationRegex: USERNAME_REGEX,
          show: true,
          inputProps: {
            autofill: 'username',
          },
        },
        {
          id: 'email',
          name: 'Email',
          validationRegex: EMAIL_REGEX,
          show: true,
          inputProps: {
            spellCheck: 'false',
            autofill: 'email',
          },
        },
      ]}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

SignUpForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

SignUpForm.defaultProps = {
  submitLabel: null,
};

export default SignUpForm;
