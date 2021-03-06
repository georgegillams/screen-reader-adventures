import React from 'react';

import { CompactCardSkeleton, SectionSkeleton } from 'gg-components/Skeletons';

const getClassName = c => c;

const AdminBlogsSkeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

export default AdminBlogsSkeleton;
