import React, { Fragment } from 'react';

import TicketOptionsSkeleton from '../TicketOptions/Skeleton';

import { CompactCardSkeleton, ButtonSkeleton } from 'components/Skeletons';

const Skeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <TicketOptionsSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default Skeleton;
