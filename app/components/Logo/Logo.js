import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './logo.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Logo = props => {
  const {
    noPadding,
    animated,
    small,
    className,
    alwaysCentered,
    light,
    ...rest
  } = props;
  const classNameFinal = [getClassName('logo__container')];
  if (className) {
    classNameFinal.push(className);
  }
  if (alwaysCentered) {
    classNameFinal.push(getClassName('logo__container--centered'));
  }
  if (animated) {
    classNameFinal.push(getClassName('logo__container--animated'));
  }

  const baseTextClassNameFinal = [getClassName('logo__logo-base')];
  if (light) {
    baseTextClassNameFinal.push(getClassName('logo__logo-base--light'));
  }

  const largeTextClassNameFinal = [getClassName('logo__logo-large')];
  if (small) {
    largeTextClassNameFinal.push(getClassName('logo__logo-large--smaller'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('logo__container--no-padding'));
    largeTextClassNameFinal.push(getClassName('logo__logo-large--no-padding'));
    baseTextClassNameFinal.push(getClassName('logo__logo-base--no-padding'));
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <Link role="button" aria-label="Home page" to="/">
        <BpkText textStyle="xxl" className={largeTextClassNameFinal.join(' ')}>
          {'<G/>'}
        </BpkText>
        {!small && (
          <div>
            <br />
            <br />
            <BpkText
              textStyle="lg"
              className={baseTextClassNameFinal.join(' ')}
            >
              {'George Gillams'}
            </BpkText>
          </div>
        )}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  animated: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  alwaysCentered: PropTypes.bool,
};

Logo.defaultProps = {
  className: null,
  noPadding: false,
  animated: false,
  small: false,
  light: false,
  alwaysCentered: false,
};

export default Logo;
