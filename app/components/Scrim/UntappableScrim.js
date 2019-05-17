import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import { getDebugViewsShown } from 'helpers/storageHelpers';

import STYLES from './untappable-scrim.scss';

const getClassName = cssModules(STYLES);

const UntappableScrim = props => {
  if (getDebugViewsShown()) {
    return (
      <div className={getClassName('untappable-scrim__disabled')}>
        Anti-cheat scrim disabled
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={getClassName('untappable-scrim__scrim')}
      {...props}
    />
  );
};

export default UntappableScrim;
