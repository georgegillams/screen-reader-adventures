import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import {
  SectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const SignUpSkeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton />
      <InputSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default SignUpSkeleton;
