import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  SectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from 'gg-components/dist/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const SignUpSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <InputSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default SignUpSkeleton;
