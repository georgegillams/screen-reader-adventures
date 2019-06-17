import React from 'react';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';
import STYLES from './skeleton.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CardSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__card')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default CardSkeleton;
