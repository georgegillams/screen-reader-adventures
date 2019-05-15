import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './request-status.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const RequestStatus = props => {
  const { status, className, ...rest } = props;
  const { type, message } = status;

  const classNameFinal = [getClassName('request-status__status')];

  if (type === 'success') {
    classNameFinal.push(getClassName('request-status__status--success'));
  }
  if (type === 'warn') {
    classNameFinal.push(getClassName('request-status__status--warn'));
  }
  if (type === 'error') {
    classNameFinal.push(getClassName('request-status__status--error'));
  }

  if (className) {
    classNameFinal.push(className);
  }

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {message}
    </span>
  );
};

RequestStatus.propTypes = {
  status: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RequestStatus.defaultProps = {
  className: null,
};

export default RequestStatus;
