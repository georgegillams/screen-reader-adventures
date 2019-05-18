import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import { getPlatform, getDebugViewsShown } from 'helpers/storageHelpers';

import STYLES from './untappable-scrim.scss';

const getClassName = cssModules(STYLES);

const UntappableScrim = props => {
  if (getDebugViewsShown()) {
    return (
      <div aria-hidden className={getClassName('untappable-scrim__disabled')}>
        Anti-cheat scrim disabled
      </div>
    );
  }
  const platform = getPlatform();
  if (platform === 'Android' || platform === 'iOS') {
    return null;
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
