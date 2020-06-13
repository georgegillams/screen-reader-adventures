import React, { Fragment } from 'react';
import { CompactCardSkeleton, SectionSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

export default AccountSkeleton;
