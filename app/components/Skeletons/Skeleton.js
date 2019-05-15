import React from 'react';

import STYLES from './skeleton.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MS = props => (
  <div {...props}>
    <div className={getClassName("skeleton__shimmer")} />
  </div>
);

export default MS;
