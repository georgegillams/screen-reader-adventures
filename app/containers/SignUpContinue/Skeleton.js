import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  SmallProgressSkeleton,
  SectionSkeleton,
  InputSkeleton,
  CheckboxSkeleton,
  ButtonSkeleton,
} from 'components/Skeletons';
import TicketStatusSkeleton from 'containers/TicketStatus/Skeleton';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const LoginFormSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <TicketStatusSkeleton />
      <SectionSkeleton />
      <SmallProgressSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <CheckboxSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
