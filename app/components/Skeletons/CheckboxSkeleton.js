import React from 'react';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';
import STYLES from './skeleton.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CheckboxSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__checkbox')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default CheckboxSkeleton;
