import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BpkSmallNewWindowIcon from 'bpk-component-icon/sm/new-window';

import STYLES from './typography.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const TextLink = props => {
  const {
    external,
    fancy,
    light,
    href,
    className,
    textClassName,
    children,
    onClick,
    ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  classNameFinal.push(getClassName('typography__link'));
  classNameFinal.push(getClassName('typography__link--text-link'));
  classNameFinal.push(getClassName('typography--no-padding'));
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    classNameFinal.push(getClassName('typography--light--text-link'));
  }
  if (fancy) classNameFinal.push(getClassName('typography--fancy'));
  classNameFinal.push(getClassName('typography--inline'));
  if (className) {
    classNameFinal.push(className);
  }

  return external ? (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={classNameFinal.join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
      <div className={getClassName('typography__icon')}>
        <BpkSmallNewWindowIcon
          className={getClassName('typography__icon--inner')}
        />
      </div>
    </a>
  ) : (
    <Link
      to={href}
      onClick={onClick}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      {children}
    </Link>
  );
};

TextLink.propTypes = {
  onClick: PropTypes.func,
  fancy: PropTypes.bool,
  external: PropTypes.bool,
  light: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
};

TextLink.defaultProps = {
  onClick: null,
  external: false,
  fancy: false,
  light: false,
  href: null,
  children: null,
  textClassName: null,
  className: null,
};

export default TextLink;
