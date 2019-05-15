import React, { Fragment } from 'react';
import { CompactCardSkeleton, SectionSkeleton } from 'components/Skeletons';
import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils'; const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

export default AccountSkeleton;
