import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';

import DeprecationNotice from 'containers/DeprecationNotice';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const GeorgeTrackingSystem = props => {
  const { className } = props;
  const outerClassNameFinal = [getClassName('pages__container--centered')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <Helmet title="Tracking" />
      <DeprecationNotice />
    </div>
  );
};

GeorgeTrackingSystem.propTypes = {
  className: PropTypes.string,
};

GeorgeTrackingSystem.defaultProps = {
  className: null,
};

export default GeorgeTrackingSystem;
