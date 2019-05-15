import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './quote.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Quote = props => {
  const { children, className, ...rest } = props;

  const classNameFinal = [getClassName('quote__container')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {children}
    </div>
  );
};

Quote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Quote.defaultProps = {
  className: null,
};

export default Quote;
