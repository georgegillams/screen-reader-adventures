import React from 'react';
import PropTypes from 'prop-types';

import { APIEntity } from 'gg-components/dist/Auth';

const AdminUsersAPIEntity = props => {
  const { entity, ...rest } = props;

  let backgroundColor = '#fcb4b4'; // red
  if (
    entity.overallRegistrationStatus === 'COMPLETE' &&
    entity.registrationStatus.photoRelease !== 'COMPLETE'
  ) {
    backgroundColor = 'yellow'; // yellow
  } else if (entity.overallRegistrationStatus === 'COMPLETE') {
    backgroundColor = '#b4fcb4'; // green
  } else if (entity.overallRegistrationStatus === 'INCOMPLETE') {
    backgroundColor = '#FFB964'; // orange
  }

  return <APIEntity style={{ backgroundColor }} entity={entity} {...rest} />;
};

AdminUsersAPIEntity.propTypes = {
  entity: PropTypes.object.isRequired,
};

export default AdminUsersAPIEntity;
