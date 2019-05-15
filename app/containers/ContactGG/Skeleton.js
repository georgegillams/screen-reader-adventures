import React, { Fragment } from 'react';
import {
  CompactCardSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'components/Skeletons';
import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils'; const getClassName = cssModules(STYLES);

const ContactSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [
    'pages__container',
    'pages__container--centered',
  ];

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
