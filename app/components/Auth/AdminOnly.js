import React from 'react';
import PropTypes from 'prop-types';

import { TextLink, Section } from 'gg-components/dist/Typography';

const AdminOnly = props => {
  const { user, children, setLoginRedirect } = props;

  if (user && user.admin) {
    return children;
  }

  return (
    <Section name="Admin only">
      <span>
        You need to be logged in with an admin account to view this content.
      </span>
      <br />
      <TextLink onClick={setLoginRedirect} to="/login">
        Got a different admin account? Log in here.
      </TextLink>
    </Section>
  );
};

AdminOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  setLoginRedirect: PropTypes.func,
};

AdminOnly.defaultProps = {
  setLoginRedirect: null,
};

export default AdminOnly;
