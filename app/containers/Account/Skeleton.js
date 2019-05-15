import React from 'react';
import { SectionSkeleton, ButtonSkeleton } from 'components/Skeletons';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

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
