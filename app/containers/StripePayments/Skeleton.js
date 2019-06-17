import React from 'react';
import { cssModules } from 'bpk-react-utils';

import LowerPageSkeleton from './LowerPageSkeleton';

import TicketStatusSkeleton from 'containers/TicketStatus/Skeleton';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const LoginFormSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <TicketStatusSkeleton />
      <LowerPageSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
