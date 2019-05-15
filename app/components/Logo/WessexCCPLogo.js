import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import BpkText from 'bpk-component-text';
import BpkImage from 'bpk-component-image';

import STYLES from './wessex-ccp-logo.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const LONG_PRESS_DURATION = 3000;

class WessexCCPLogo extends Component {
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
    const classNameFinal = [getClassName('wessex-ccp-logo__container')];
    if (className) {
      classNameFinal.push(className);
    }
    if (alwaysCentered) {
      classNameFinal.push(getClassName('wessex-ccp-logo__container--centered'));
    }
    if (animated) {
      classNameFinal.push(getClassName('wessex-ccp-logo__container--animated'));
    }

    const baseTextClassNameFinal = [getClassName('wessex-ccp-logo__logo-base')];
    if (light) {
      baseTextClassNameFinal.push(
        getClassName('wessex-ccp-logo__logo-base--light'),
      );
    }

    const largeTextClassNameFinal = [
      getClassName('wessex-ccp-logo__logo-large'),
    ];
    if (small) {
      largeTextClassNameFinal.push(
        getClassName('wessex-ccp-logo__logo-large--smaller'),
      );
    }
    if (noPadding) {
      classNameFinal.push(
        getClassName('wessex-ccp-logo__container--no-padding'),
      );
      largeTextClassNameFinal.push(
        getClassName('wessex-ccp-logo__logo-large--no-padding'),
      );
      baseTextClassNameFinal.push(
        getClassName('wessex-ccp-logo__logo-base--no-padding'),
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
          href="http://www.epicc-conference.org/"
          onMouseLeave={this.onMouseLeave}
        >
          <BpkImage
            src={
              small
                ? 'https://i.imgur.com/h5zmNwn.png'
                : 'https://i.imgur.com/3nVx6yS.png'
            }
            className={largeTextClassNameFinal.join(' ')}
            width={2000}
            height={small ? 348 : 187}
          />
        </a>
      </div>
    );
  }
}

WessexCCPLogo.propTypes = {
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  animated: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  alwaysCentered: PropTypes.bool,
};

WessexCCPLogo.defaultProps = {
  className: null,
  noPadding: false,
  animated: false,
  small: false,
  light: false,
  alwaysCentered: false,
};

export default WessexCCPLogo;
