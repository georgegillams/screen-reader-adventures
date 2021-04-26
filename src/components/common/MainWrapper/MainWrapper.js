import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './main-wrapper.scss';
import { DEBUG_SHOW_PAGE_CONTAINER_KEY } from 'helpers/storageConstants';

const getClassName = cssModules(STYLES);

const MainWrapper = props => {
  const { className, ...rest } = props;
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setShowDebug(window.localStorage.getItem(DEBUG_SHOW_PAGE_CONTAINER_KEY) === 'true');
  }, []);

  const outerClassNames = [getClassName('page-container__container')];
  if (showDebug) {
    outerClassNames.push([getClassName('page-container__container--debug')]);
  }

  if (className) {
    outerClassNames.push(className);
  }

  return <main id="main" className={outerClassNames.join(' ')} {...rest} />;
};

MainWrapper.propTypes = {
  className: PropTypes.string,
};

MainWrapper.defaultProps = {
  className: null,
};

export default MainWrapper;
