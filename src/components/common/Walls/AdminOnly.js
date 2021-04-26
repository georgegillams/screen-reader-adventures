import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'gg-components/Paragraph';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';

const AdminOnly = props => {
  const { user, children, setLoginRedirect, ...rest } = props;

  if (user && user.admin) {
    return children;
  }

  return (
    <Section name="Admin only" {...rest}>
      <Paragraph>
        You need to be logged in with an admin account to view this content.
        <br />
        <TextLink onClick={setLoginRedirect} href="/login">
          Got a different admin account? Log in here.
        </TextLink>
      </Paragraph>
    </Section>
  );
};

AdminOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
  setLoginRedirect: PropTypes.func,
};

AdminOnly.defaultProps = {
  user: null,
  setLoginRedirect: null,
};

export default AdminOnly;
