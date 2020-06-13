import React from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import { SectionSkeleton, ButtonSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <ButtonSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default AccountSkeleton;
