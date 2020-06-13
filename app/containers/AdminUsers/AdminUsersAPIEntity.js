import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { APIEntity } from 'gg-components/Auth';
import { Button } from 'gg-components/Button';
import { Card } from 'gg-components/Cards';

import AdminUserEdit from 'containers/AdminUserEdit/Loadable';

const AdminUsersAPIEntity = props => {
  const { compact, entity, onUserUpdateSuccess, children, ...rest } = props;
  const [editing, setEditing] = useState(false);

  let backgroundColor = null; // red
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

  const content = (
    <>
      <APIEntity style={{ backgroundColor }} entity={entity} />
      {editing && entity && !compact && (
        <AdminUserEdit
          style={{
            width: '100%',
          }}
          id={entity.id}
          testProp="testProp"
          onUserUpdateSuccess={() => {
            onUserUpdateSuccess();
            setTimeout(() => {
              setEditing(false);
            }, 500);
          }}
        />
      )}
      {!compact && (
        <>
          <br />
          <br />
          <Button
            large
            onClick={() => {
              setEditing(!editing);
            }}
          >
            {editing ? 'Cancel edit' : 'Edit user'}
          </Button>
        </>
      )}
      {!compact && children && children}
    </>
  );

  if (compact) {
    return <Card {...rest}>{content}</Card>;
  }
  return <div {...rest}>{content}</div>;
};

AdminUsersAPIEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  compact: PropTypes.boolean,
  onUserUpdateSuccess: PropTypes.func,
  children: PropTypes.node,
};

AdminUsersAPIEntity.defaultProps = {
  compact: false,
  onUserUpdateSuccess: null,
  children: null,
};

export default AdminUsersAPIEntity;
