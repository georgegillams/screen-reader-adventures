import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './flex-layout.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const LegacyCommonLayout = props => {
  const { children } = props;

  return (
    <main id="main" className={getClassName('flex-layout__grow')}>
      {children}
    </main>
  );
};

LegacyCommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LegacyCommonLayout;
