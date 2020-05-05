import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import { SectionSkeleton, CardSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default AccountSkeleton;
