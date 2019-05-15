import React from 'react';
import PropTypes from 'prop-types';
import { TextLink } from 'components/Typography';
import STATUS_TYPES from './StatusTypes';

import STYLES from './status.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Status = props => {
  const { shadow, type, large, className, ...rest } = props;

  const classNameFinal = [getClassName('status__outer-container')];
  if (className) classNameFinal.push(className);

  const statusClassName = [getClassName('status__container')];
  if (large) {
    statusClassName.push(getClassName('status__container--large'));
  }
  if (type === STATUS_TYPES.SUCCESS) {
    statusClassName.push(getClassName('status__container--success'));
  }
  if (type === STATUS_TYPES.WARN) {
    statusClassName.push(getClassName('status__container--warn'));
  }
  if (type === STATUS_TYPES.ERROR) {
    statusClassName.push(getClassName('status__container--error'));
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {large && shadow && (
        <div className={getClassName("status__shadow-container")}>
          <div className={getClassName("status__shadow")} />
        </div>
      )}
      <div className={statusClassName.join(' ')}>
        {type === STATUS_TYPES.SUCCESS && '✔'}
        {type === STATUS_TYPES.WARN && '!'}
        {type === STATUS_TYPES.ERROR && large && '✘'}
      </div>
    </div>
  );
};

Status.propTypes = {
  type: PropTypes.string.isRequired,
  large: PropTypes.bool,
  shadow: PropTypes.bool,
  className: PropTypes.string,
};

Status.defaultProps = {
  shadow: false,
  large: false,
  className: null,
};

export default Status;
