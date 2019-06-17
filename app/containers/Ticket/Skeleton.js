import React from 'react';
import { cssModules } from 'bpk-react-utils';

import { TicketStatusSkeleton } from 'components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => <TicketStatusSkeleton {...props} />;

export default Skeleton;
