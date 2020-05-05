import React from 'react';
import { cssModules } from 'bpk-react-utils';

import { SectionSkeleton, ButtonSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <ButtonSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default AccountSkeleton;
