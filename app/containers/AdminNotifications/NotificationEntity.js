import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'gg-components/Cards';
import { NotificationComp } from 'gg-components/Notifications';
import { Button } from 'gg-components/Button';
import { APIEntity } from 'gg-components/Auth';

import AdminNotificationEdit from 'containers/AdminNotificationEdit/Loadable';

const NotificationEntity = props => {
  const { entity, onNotificationUpdateSuccess, children, ...rest } = props;
  const [editing, setEditing] = useState(false);

  return (
    <Card {...rest}>
      <APIEntity name="more" entityType="Notification" entity={entity} />
      <NotificationComp
        style={{ width: '100%' }}
        type={entity.type}
        deleted={entity.deleted}
      >
        {entity.message}
      </NotificationComp>
      <br />
      <br />
      {editing && (
        <AdminNotificationEdit
          id={entity.id}
          onNotificationUpdateSuccess={() => {
            onNotificationUpdateSuccess();
            setTimeout(() => {
              setEditing(false);
            }, 500);
          }}
        />
      )}
      <br />
      <br />
      <Button
        large
        onClick={() => {
          setEditing(!editing);
        }}
      >
        {editing ? 'Cancel edit' : 'Edit notification'}
      </Button>
      {children && children}
    </Card>
  );
};

NotificationEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  compact: PropTypes.boolean,
  onNotificationUpdateSuccess: PropTypes.func,
  children: PropTypes.node,
};

NotificationEntity.defaultProps = {
  compact: false,
  onNotificationUpdateSuccess: null,
  children: null,
};

export default NotificationEntity;
