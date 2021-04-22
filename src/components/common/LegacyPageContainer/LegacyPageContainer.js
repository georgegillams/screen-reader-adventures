import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './page-container.scss';
import { DEBUG_SHOW_PAGE_CONTAINER_KEY } from 'helpers/storageConstants';

export const LAYOUT_STYLES = {
  default: 'default',
  defaultCenter: 'defaultCenter',
  prose: 'prose',
  proseCenter: 'proseCenter',
  fullWidth: 'fullWidth',
  fullWidthCenter: 'fullWidthCenter',
};

const getClassName = cssModules(STYLES);

const LegacyPageContainer = props => {
  const { className, layout, bottomPadding, ...rest } = props;
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setShowDebug(window.localStorage.getItem(DEBUG_SHOW_PAGE_CONTAINER_KEY) === 'true');
  }, []);

  const outerClassNames = [getClassName('page-container__container')];
  if (bottomPadding) {
    outerClassNames.push([getClassName('page-container__container--bottom-padding')]);
  }
  if (showDebug) {
    outerClassNames.push([getClassName('page-container__container--debug')]);
  }
  if (layout === LAYOUT_STYLES.default || layout === LAYOUT_STYLES.defaultCenter) {
    outerClassNames.push([getClassName('page-container__container--regular')]);
  }
  if (layout === LAYOUT_STYLES.prose || layout === LAYOUT_STYLES.proseCenter) {
    outerClassNames.push([getClassName('page-container__container--prose')]);
  }
  if (layout === LAYOUT_STYLES.fullWidth || layout === LAYOUT_STYLES.fullWidthCenter) {
    outerClassNames.push([getClassName('page-container__container--full-width')]);
  }
  if (
    layout === LAYOUT_STYLES.defaultCenter ||
    layout === LAYOUT_STYLES.proseCenter ||
    layout === LAYOUT_STYLES.fullWidthCenter
  ) {
    outerClassNames.push([getClassName('page-container__container--center')]);
  }

  if (className) {
    outerClassNames.push(className);
  }

  return <main id="main" className={outerClassNames.join(' ')} {...rest} />;
};

LegacyPageContainer.propTypes = {
  layout: PropTypes.oneOf(Object.keys(LAYOUT_STYLES)),
  className: PropTypes.string,
  bottomPadding: PropTypes.bool,
};

LegacyPageContainer.defaultProps = {
  layout: LAYOUT_STYLES.default,
  className: null,
  bottomPadding: true,
};

export default LegacyPageContainer;
