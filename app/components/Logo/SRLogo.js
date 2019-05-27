import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import BpkText from 'bpk-component-text';
import BpkImage from 'bpk-component-image';
import Logo from './screen_reader_adventures.png';

import STYLES from './sr-logo.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const LONG_PRESS_DURATION = 3000;

class SRLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onMouseLeave = () => {};

  render() {
    const {
      noPadding,
      animated,
      small,
      className,
      alwaysCentered,
      light,
      ...rest
    } = this.props;
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
      largeTextClassNameFinal.push(
        getClassName('sr-logo__logo-large--smaller'),
      );
    }
    if (noPadding) {
      classNameFinal.push(getClassName('sr-logo__container--no-padding'));
      largeTextClassNameFinal.push(
        getClassName('sr-logo__logo-large--no-padding'),
      );
      baseTextClassNameFinal.push(
        getClassName('sr-logo__logo-base--no-padding'),
      );
    }

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <a
          role="button"
          aria-label="Main conference page"
          onMouseEnter={() => {
            this.setState({ hovering: true });
          }}
          onFocus={() => {
            this.setState({ hovering: true });
          }}
          onMouseLeave={() => {
            this.setState({ hovering: false });
          }}
          onBlur={() => {
            this.setState({ hovering: false });
          }}
          href="/"
          onMouseLeave={this.onMouseLeave}
        >
          <BpkImage
            src={Logo}
            className={largeTextClassNameFinal.join(' ')}
            width={1}
            height={1}
          />
        </a>
      </div>
    );
  }
}

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
