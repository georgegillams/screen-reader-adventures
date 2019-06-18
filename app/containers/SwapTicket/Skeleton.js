import React, { Fragment } from 'react';

import LowerPageSkeleton from './LowerPageSkeleton';

import { CompactCardSkeleton, SectionSkeleton } from 'components/Skeletons';
import TicketStatusSkeleton from 'containers/TicketStatus/Skeleton';

const Skeleton = props => {
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

export default Skeleton;
