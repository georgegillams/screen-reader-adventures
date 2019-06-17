import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BurgerButton } from 'components/GGButton';
import { cssModules } from 'bpk-react-utils';

import STYLES from './navigation-bar.scss';

import PAGE_STYLES from 'containers/pages.scss';

const getClassName = cssModules({ ...STYLES, ...PAGE_STYLES });

class NavigationBar extends Component {
  constructor(props) {
    super(props);

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
    }, 500);
  };

  open = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 100);
  };

  render() {
    const { className, menuItems, logo, accountMenuItem, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('navigation-bar__container')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const animatedContainerClassNameFinal = [
      getClassName('navigation-bar__animated-container'),
    ];
    const scrimClassNames = [getClassName('navigation-bar__scrim')];
    const burgerClassNames = [getClassName('navigation-bar__burger-button')];
    if (this.state.isOpen) {
      animatedContainerClassNameFinal.push(
        getClassName('navigation-bar__animated-container--open'),
      );
      scrimClassNames.push(getClassName('navigation-bar__scrim--open'));
    }

    const menuItemsWithClickBehaviour =
      menuItems &&
      menuItems.map(menuItem =>
        menuItem
          ? React.cloneElement(menuItem, {
              onClick: this.close,
              className: getClassName('navigation-bar__sidebar-menu-item'),
            })
          : null,
      );

    return (
      <div>
        {this.state.show && (
          <div aria-hidden="true" className={scrimClassNames.join(' ')} />
        )}

        {this.state.show && (
          <div
            aria-hidden={this.state.show ? null : 'true'}
            className={animatedContainerClassNameFinal.join(' ')}
          >
            <div
              className={getClassName('navigation-bar__mobile-menu-container')}
            >
              {menuItemsWithClickBehaviour}
            </div>
          </div>
        )}
        <div className={getClassName('navigation-bar__bar-placeholder')} />
        <div className={outerClassNameFinal.join(' ')} {...rest}>
          <div
            className={getClassName(
              'pages__container',
              'pages__container--centered',
              'navigation-bar__bar',
            )}
            {...rest}
          >
            <div
              className={getClassName(
                'navigation-bar__mobile-container',
                'navigation-bar__mobile-container--left',
              )}
            >
              <BurgerButton
                className={burgerClassNames.join(' ')}
                lineClassName={getClassName(
                  'navigation-bar__burger-button__line',
                )}
                isOpen={this.state.isOpen}
                aria-label="Menu"
                onClick={this.toggle}
              />
            </div>
            <div className={getClassName('navigation-bar__logo-container')}>
              {logo}
            </div>
            <div
              className={getClassName(
                'navigation-bar__mobile-container',
                'navigation-bar__mobile-container--rgt',
              )}
            >
              {accountMenuItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  accountMenuItem: PropTypes.node,
  className: PropTypes.string,
  logo: PropTypes.node,
  menuItems: PropTypes.arrayOf(PropTypes.node),
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

NavigationBar.defaultProps = {
  accountMenuItem: null,
  className: null,
  logo: null,
  menuItems: null,
  user: null,
};

export default NavigationBar;
