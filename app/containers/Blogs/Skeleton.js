import React from 'react';
import PropTypes from 'prop-types';
import { SmallButtonSkeleton } from 'gg-components/Skeletons';

import BlogListSkeleton from './BlogListSkeleton';

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SmallButtonSkeleton
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      />
      <BlogListSkeleton />
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
