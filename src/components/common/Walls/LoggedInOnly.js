import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Paragraph';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';

const LoggedInOnly = props => {
  const { user, activityName, children, setLoginRedirect, ...rest } = props;

  if (!user) {
    return (
      <Section name="Logged out" {...rest}>
        <Paragraph>
          You need to be logged in to {activityName || 'view this content'}
          <br />
          <TextLink href="/sign-up">Register here - it&apos;s quick and easy.</TextLink>
          <br />
          <TextLink onClick={setLoginRedirect} href="/login">
            Already got an account? Log in here.
          </TextLink>
        </Paragraph>
      </Section>
    );
  }

  return children;
};

LoggedInOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
  activityName: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

LoggedInOnly.defaultProps = {
  activityName: null,
  user: null,
};

export default LoggedInOnly;
