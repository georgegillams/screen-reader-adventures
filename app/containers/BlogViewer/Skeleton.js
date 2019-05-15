import React, { Fragment } from 'react';
import { SectionSkeleton, CardSkeleton } from 'components/Skeletons';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [
    getClassName('pages__container'),
    getClassName('pages__container--prose'),
  ];

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
