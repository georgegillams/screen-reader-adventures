import React from 'react';
import PropTypes from 'prop-types';

import ObjectAsList from './ObjectAsList';

import { getTimeDifference } from 'helpers/time';
import { Section } from 'gg-components/dist/Typography';

const APIEntity = props => {
  const { entityType, entity, name, children, ...rest } = props;
  if (!entity) {
    return null;
  }

  const {
    id,
    timestamp,
    lastUpdatedTimestamp,
    deleted,
    authorId,
    ...entityRest
  } = entity;

  return (
    <Section name={`${entityType || 'Entity'} ${id}`} {...rest}>
      {`Created ${timestamp}`}
      <br />
      {`Deleted ${deleted}`}
      <br />
      {`Created by ${authorId}`}
      <br />
      {`Last updated: ${getTimeDifference(
        lastUpdatedTimestamp,
      )} (${lastUpdatedTimestamp})`}
      <br />
      <ObjectAsList name={name} value={entityRest} />
      {children}
    </Section>
  );
};

APIEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  entityType: PropTypes.String,
  name: PropTypes.String.isRequired,
  children: PropTypes.node,
};

APIEntity.defaultProps = {
  entityType: null,
  children: null,
};

export default APIEntity;
