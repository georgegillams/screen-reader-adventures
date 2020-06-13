import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { SectionSkeleton, CardSkeleton } from 'gg-components/Skeletons';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [getClassName('pages__container--prose')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ width: '15rem' }} />
      <CardSkeleton style={{ height: '50rem' }} />
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
