import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import RequestStatus from './RequestStatus';
import STYLES from './request-status.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const RequestStatusContainer = props => {
  const { statuses } = props;

  const classNameFinal = [getClassName('request-status__outer-container')];
  if (statuses && statuses.length > 0) {
    classNameFinal.push(
      getClassName('request-status__outer-container--statuses-showing'),
    );
  }

  return (
    <div className={classNameFinal.join(' ')}>
      {statuses &&
        statuses.map &&
        statuses.map(status => <RequestStatus status={status} />)}
    </div>
  );
};

RequestStatusContainer.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object),
};

RequestStatusContainer.defaultProps = {
  statuses: [],
};

export default RequestStatusContainer;
