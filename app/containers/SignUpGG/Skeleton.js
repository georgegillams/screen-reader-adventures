import React, { Fragment } from 'react';
import {
  SectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from 'components/Skeletons';
import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils'; const getClassName = cssModules(STYLES);

const SignUpSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

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
