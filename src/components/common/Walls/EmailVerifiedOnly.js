import React from 'react';
import PropTypes from 'prop-types';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';

const EmailVerifiedOnly = props => {
  const { user, children, ...rest } = props;

  if (user && user.emailVerified) {
    return children;
  }

  return (
    <Section name="You need to verify your email before completing this step." {...rest}>
      <TextLink href="/account">Account</TextLink>
    </Section>
  );
};

EmailVerifiedOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

EmailVerifiedOnly.defaultProps = {
  user: null,
};

export default EmailVerifiedOnly;
