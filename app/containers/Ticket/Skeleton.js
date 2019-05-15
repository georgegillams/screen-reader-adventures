import React from 'react';
import { TicketStatusSkeleton } from 'components/Skeletons';
import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils'; const getClassName = cssModules(STYLES);

const Skeleton = props => {
  return <TicketStatusSkeleton {...props} />;
};

export default Skeleton;
