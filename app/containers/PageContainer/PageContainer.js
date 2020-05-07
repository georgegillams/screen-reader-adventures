import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const PageContainer = props => {
  const { className, ...rest } = props;
  const [showDebug, setShowDebug] = useState(false);

  useEffect(
    () =>
      setShowDebug(
        window.localStorage.getItem('showPageContainerDebugColor') === 'true',
      ),
    [],
  );

  const outerClassNames = [getClassName('pages__container')];
  if (showDebug) {
    outerClassNames.push([getClassName('pages__container--debug')]);
  }

  if (className) {
    outerClassNames.push(className);
  }

  return <main className={outerClassNames.join(' ')} {...rest} />;
};

PageContainer.propTypes = {
  className: PropTypes.string,
};

PageContainer.defaultProps = {
  className: null,
};

export default PageContainer;
