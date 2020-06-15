import React from 'react';
import PropTypes from 'prop-types';
import BpkImage from 'bpk-component-image';
import { cssModules } from 'gg-components/helpers/cssModules';

import RegularLogo from './screen_reader_adventures.png';
import PrideLogo from './screen_reader_adventures_pride.png';
import STYLES from './sr-logo.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SRLogo = props => {
  const {
    noPadding,
    animated,
    small,
    className,
    alwaysCentered,
    light,
    ...rest
  } = props;
  const classNameFinal = [getClassName('sr-logo__container')];
  if (className) {
    classNameFinal.push(className);
  }
  if (alwaysCentered) {
    classNameFinal.push(getClassName('sr-logo__container--centered'));
  }
  if (animated) {
    classNameFinal.push(getClassName('sr-logo__container--animated'));
  }

  const baseTextClassNameFinal = [getClassName('sr-logo__logo-base')];
  if (light) {
    baseTextClassNameFinal.push(getClassName('sr-logo__logo-base--light'));
  }

  const largeTextClassNameFinal = [getClassName('sr-logo__logo-large')];
  if (small) {
    largeTextClassNameFinal.push(getClassName('sr-logo__logo-large--smaller'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('sr-logo__container--no-padding'));
    largeTextClassNameFinal.push(
      getClassName('sr-logo__logo-large--no-padding'),
    );
    baseTextClassNameFinal.push(getClassName('sr-logo__logo-base--no-padding'));
  }

  const date = new Date();
  const isPride = date.getMonth() === 5;
  const Logo = isPride ? PrideLogo : RegularLogo;

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <a role="button" aria-label="Home page" href="/">
        <BpkImage
          src={Logo}
          className={largeTextClassNameFinal.join(' ')}
          width={1}
          height={1}
        />
      </a>
    </div>
  );
};

SRLogo.propTypes = {
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  animated: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  alwaysCentered: PropTypes.bool,
};

SRLogo.defaultProps = {
  className: null,
  noPadding: false,
  animated: false,
  small: false,
  light: false,
  alwaysCentered: false,
};

export default SRLogo;
