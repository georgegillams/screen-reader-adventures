import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import STYLES from './code.scss';

const getClassName = cssModules(STYLES);

const CodeInline = props => {
  const { children, className, ...rest } = props;

  const classNameFinal = [
    getClassName('code__outer-container'),
    getClassName('code__outer-container--light'),
  ];
  if (className) classNameFinal.push(className);

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {children}
    </span>
  );
};

CodeInline.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeInline.defaultProps = {
  lang: null,
  className: null,
};

export default CodeInline;
