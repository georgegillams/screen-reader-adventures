import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'gg-components/Button';
import { Paragraph } from 'gg-components/Paragraph';
import { Subsection } from 'gg-components/Subsection';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import { UserEditForm } from 'components/common/Forms';
import ErrorDisplay from 'components/common/ErrorDisplay';
import STYLES from './admin-users.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const AdminUsersAPIEntity = props => {
  const { compact, entity, updateUser, adminUserState, children, ...rest } = props;
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  const content = (
    <Subsection anchor={false} padding={!compact} name={entity.name || `User ${entity.id}`}>
      <Paragraph>
        {compact && <br />}
        id: {entity.id}
        {!compact && (
          <>
            {entity.deleted && (
              <>
                <br />
                DELETED
              </>
            )}
            <br />
            uname: {entity.uname}
            <br />
            email: {entity.email}
            <br />
            {entity.admin ? 'Admin' : 'Regular user'}
            <br />
            Email{entity.emailVerified ? '' : ' not'} verified
          </>
        )}
      </Paragraph>
      {!compact && (
        <div className={getClassName('admin-users__control-panel')}>
          <Button
            className={getClassName('admin-users__edit-button')}
            onClick={() => {
              setEditing(!editing);
            }}>
            {editing ? 'Cancel edit' : 'Edit user'}
          </Button>
        </div>
      )}
      {editing && (
        <UserEditForm
          showAdminControls
          user={updatedUser || entity}
          onDataChanged={setUpdatedUser}
          onSubmit={() => {
            if (updateUser) {
              updateUser({
                userToUpdate: updatedUser,
                onUpdateSuccessCb: () => {
                  setEditing(false);
                },
              });
            }
          }}
          loading={adminUserState.updating}
        />
      )}
      {!compact && adminUserState && (
        <ErrorDisplay message="Could not update user" error={adminUserState.updateError} />
      )}
      {!compact && children && children}
    </Subsection>
  );

  if (compact) {
    return (
      <SplitDetailItem id={entity.id} {...rest}>
        {content}
      </SplitDetailItem>
    );
  }
  return (
    <div id={entity.id} {...rest}>
      {content}
    </div>
  );
};

AdminUsersAPIEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
  children: PropTypes.node,
  compact: PropTypes.bool,
  adminUserState: PropTypes.object,
};

AdminUsersAPIEntity.defaultProps = {
  updateUser: null,
  children: null,
  compact: false,
  adminUserState: null,
};

export default AdminUsersAPIEntity;
