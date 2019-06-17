import React from 'react';
import PropTypes from 'prop-types';

import { Section } from 'components/Typography';

const User = props => {
  const { welcomeMessage, user, showAdvancedInfo } = props;
  const { id, name, email, emailFingerprint, emailVerified, phone } = user;

  if (!user || !name) {
    return <Section name="Loading user info..." />;
  }

  return (
    <Section name={`${welcomeMessage || 'User'} ${id}`}>
      {`Name: ${name}`}
      <br />
      {`Email: ${email}`}
      <br />
      {`Phone: ${phone}`}
      <br />
      {showAdvancedInfo && `Email fingerprint: ${emailFingerprint}`}
      {showAdvancedInfo && <br />}
      {`Email verified: ${emailVerified}`}
      <br />
      <br />
    </Section>
  );
};

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  welcomeMessage: PropTypes.String,
  showAdvancedInfo: PropTypes.bool,
};

User.defaultProps = {
  welcomeMessage: null,
  showAdvancedInfo: false,
};

export default User;
