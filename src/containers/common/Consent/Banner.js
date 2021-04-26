import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './banner.scss';

const getClassName = cssModules(STYLES);

const Banner = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={getClassName('banner__outer', className)} {...rest}>
      <div className={getClassName('banner__inner')}>{children}</div>
    </div>
  );
};

Banner.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Banner.defaultProps = {
  className: null,
};

export default Banner;
