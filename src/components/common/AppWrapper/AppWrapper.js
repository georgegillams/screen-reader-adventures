import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './app-wrapper.scss';

import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const AppWrapper = props => {
  const { className, ...rest } = props;

  return <div className={getClassName('app__app-wrapper', className)} {...rest} />;
};

AppWrapper.propTypes = {
  className: PropTypes.string,
};

AppWrapper.defaultProps = {
  className: null,
};

export default AppWrapper;
