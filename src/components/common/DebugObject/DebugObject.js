import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import { DEBUG_SHOW_DEBUG_INFORMATION_KEY } from 'helpers/storageConstants';

const Loading = () => <div />;
const LoadableGGDebugObject = Loadable({
  loader: () => import('./GGDebugObject.js'),
  loading: Loading,
});

const DebugObject = props => {
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setShowDebug(window.localStorage.getItem(DEBUG_SHOW_DEBUG_INFORMATION_KEY) === 'true');
  }, []);

  if (!showDebug) {
    return null;
  }

  return <LoadableGGDebugObject {...props} />;
};

DebugObject.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  debugObject: PropTypes.object.isRequired,
  debugTitle: PropTypes.string,
};

DebugObject.defaultProps = {
  debugTitle: null,
};

export default DebugObject;
