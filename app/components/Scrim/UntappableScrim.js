import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './untappable-scrim.scss';

import { getPlatform, getDebugViewsShown } from 'utils/storageHelpers';

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
