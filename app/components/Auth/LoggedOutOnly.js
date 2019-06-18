import React from 'react';
import PropTypes from 'prop-types';

import { TextLink, Section } from 'components/Typography';

const LoggedOutOnly = props => {
  const { user, children } = props;

  if (user) {
    return (
      <Section name="You're logged in">
        <TextLink to="/account">Go to your account.</TextLink>
      </Section>
    );
  }

  return children;
};

LoggedOutOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoggedOutOnly;
