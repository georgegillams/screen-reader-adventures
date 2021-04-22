import React from 'react';
import PropTypes from 'prop-types';
import { SectionSkeleton, CompactCardSkeleton } from 'gg-components/Skeletons';

const Skeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <SectionSkeleton />
      <CompactCardSkeleton style={{ marginTop: '1.2rem' }} />
      <CompactCardSkeleton style={{ marginTop: '1.2rem' }} />
      <CompactCardSkeleton style={{ marginTop: '1.2rem' }} />
      <CompactCardSkeleton style={{ marginTop: '1.2rem' }} />
    </div>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: null,
};

export default Skeleton;
