import React from 'react';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'helpers/time';
import { Section } from 'components/Typography';
import ObjectAsList from './ObjectAsList';

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
