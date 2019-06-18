import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import BlogListSkeleton from './BlogListSkeleton';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <BlogListSkeleton />
    </div>
  );
};

export default AccountSkeleton;
