import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import { Logo } from 'components/Logo';
import { ContentWidthRestrictor } from 'components/Typography';
import GGButton from 'components/GGButton';
import { SmallButtonSkeleton } from 'components/Skeletons';
import NavigationItem from './NavigationItem';

import STYLES from './navigation-bar.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    // Must show at start in case on desktop
    this.state = { isOpen: false, show: false };
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  close = () => {
    this.setState({ isOpen: false });
    setTimeout(() => {
      this.setState({ show: false });
    }, 1000);
  };

  open = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 100);
  };

  render() {
    const {
      className,
      menuItems1,
      menuItems2,
      logo,
      accountMenuItem,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('navigation-bar__container')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const animatedContainerClassNameFinal = [
      getClassName('navigation-bar__animated-container--closed'),
    ];
    if (this.state.isOpen) {
      animatedContainerClassNameFinal.push(
        getClassName('navigation-bar__animated-container--open'),
      );
    }

    const menuItems1WithClickBehaviour =
      menuItems1 &&
      menuItems1.map(menuItem =>
        menuItem
          ? React.cloneElement(menuItem, {
              onClick: this.close,
            })
          : null,
      );

    const menuItems2WithClickBehaviour =
      menuItems2 &&
      menuItems2.map(menuItem =>
        menuItem
          ? React.cloneElement(menuItem, {
              onClick: this.close,
            })
          : null,
      );

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <ContentWidthRestrictor>
          <div className={getClassName('navigation-bar__bar')} {...rest}>
            <div
              className={getClassName('navigation-bar__mobile-container--left')}
            >
              <GGButton aria-label="Menu" bouncy onClick={this.toggle}>
                {this.state.isOpen ? (
                  <BpkIconClose style={{ height: '1rem' }} />
                ) : (
                  <BpkIconMenu style={{ height: '1rem' }} />
                )}
              </GGButton>
            </div>
            {menuItems1WithClickBehaviour && (
              <div
                className={getClassName('navigation-bar__desktop-container')}
              >
                {menuItems1WithClickBehaviour}
              </div>
            )}
            <div className={getClassName('navigation-bar__logo-container')}>
              {logo}
            </div>
            {menuItems2WithClickBehaviour && (
              <div
                className={getClassName('navigation-bar__desktop-container')}
              >
                {menuItems2WithClickBehaviour}
              </div>
            )}
            <div
              className={getClassName('navigation-bar__mobile-container--rgt')}
            >
              {accountMenuItem}
            </div>
          </div>
          <div
            aria-hidden={this.state.show ? null : 'true'}
            className={animatedContainerClassNameFinal.join(' ')}
          >
            <div
              className={getClassName('navigation-bar__mobile-menu-container')}
            >
              {menuItems1WithClickBehaviour}
              {menuItems2WithClickBehaviour}
            </div>
          </div>
        </ContentWidthRestrictor>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string,
};

NavigationBar.defaultProps = {
  user: null,
  className: null,
};

export default NavigationBar;
