import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './code.scss';

const getClassName = cssModules(STYLES);

const CodeBashArrow = props => (
  <span {...props} className={getClassName('code__bash-arrow')}>
    {'▶ '}
  </span>
);

CodeBashArrow.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeBashArrow.defaultProps = {
  lang: null,
  className: null,
};

export default CodeBashArrow;
