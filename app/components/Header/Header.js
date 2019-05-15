import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import STYLES from './style.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={getClassName('header')}>
        <a href="https://twitter.com/flexdinesh">
          <img src={Banner} alt="react-redux-boilerplate - Logo" />
        </a>
        <div className={getClassName('nav-bar')}>
          <Link className={getClassName('router-link')} to="/">
            Home
          </Link>
          <Link className={getClassName('router-link')} to="/features">
            Features
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
