import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  SectionSkeleton,
  InputSkeleton,
  CheckboxSkeleton,
  ButtonSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const LoginFormSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <InputSkeleton />
      <CheckboxSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
