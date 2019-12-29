import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  CompactCardSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'gg-components/dist/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const ContactSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = ['pages__container--centered'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
      <ButtonSkeleton />
      <ButtonSkeleton />
      <SectionSkeleton />
    </div>
  );
};

export default ContactSkeleton;
