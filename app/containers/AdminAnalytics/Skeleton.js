import React from 'react';
import PropTypes from 'prop-types';
import { CompactCardSkeleton, SectionSkeleton } from 'gg-components/Skeletons';

const getClassName = c => c;

const Skeleton = props => {
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

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: null,
};

export default Skeleton;
