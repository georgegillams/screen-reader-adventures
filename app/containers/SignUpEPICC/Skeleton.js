import React, { Fragment } from 'react';
import { CompactCardSkeleton, ButtonSkeleton } from 'components/Skeletons';

import TicketOptionsSkeleton from '../TicketOptions/Skeleton';

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
