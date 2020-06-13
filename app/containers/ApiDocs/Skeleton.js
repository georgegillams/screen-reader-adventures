import React from 'react';
import PropTypes from 'prop-types';
import { SectionSkeleton, CardSkeleton } from 'gg-components/Skeletons';

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <CardSkeleton style={{ height: '35rem' }} />
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
