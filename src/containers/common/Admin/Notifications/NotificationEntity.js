import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'gg-components/Notification';
import DebugObject from 'components/common/DebugObject';

const AnalyticEntity = props => {
  const { entity, children, ...rest } = props;

  if (!entity) {
    return null;
  }

  return (
    <div {...rest}>
      <Notification type={entity.type}>{entity.message}</Notification>
      <DebugObject debugTitle="Notification" debugObject={entity} />
      {children && children}
    </div>
  );
};

AnalyticEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object,
  children: PropTypes.node,
};

AnalyticEntity.defaultProps = {
  entity: null,
  children: null,
};

export default AnalyticEntity;
