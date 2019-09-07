import React from 'react';
import PropTypes from 'prop-types';

import { TextLink, Section } from 'gg-components/dist/Typography';

const EmailVerifiedOnly = props => {
  const { user, children } = props;

  if (user && user.emailVerified) {
    return children;
  }

  return (
    <Section name="You need to verify your email before completing this step.">
      <TextLink to="/account">Account</TextLink>
    </Section>
  );
};

EmailVerifiedOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default EmailVerifiedOnly;
