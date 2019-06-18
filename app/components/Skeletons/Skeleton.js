import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './skeleton.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MS = props => (
  <div {...props}>
    <div className={getClassName('skeleton__shimmer')} />
  </div>
);

export default MS;
