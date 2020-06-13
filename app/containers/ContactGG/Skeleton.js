import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import {
  InfoCellSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'gg-components/Skeletons';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [getClassName('pages__container--centered')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ marginTop: '3rem', width: '20rem' }} />
      <div style={{ width: '100vw' }}>
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
      </div>
      <ButtonSkeleton />
      <ButtonSkeleton />
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
