import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import CommentsListSkeleton from './CommentsListSkeleton';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <CommentsListSkeleton />
    </div>
  );
};

export default Skeleton;
