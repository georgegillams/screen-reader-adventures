import React, { Fragment } from 'react';

import { CompactCardSkeleton, SectionSkeleton } from 'components/Skeletons';

const LowerPageSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  return (
    <Fragment>
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
    </Fragment>
  );
};

export default LowerPageSkeleton;
