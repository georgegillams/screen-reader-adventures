import React from 'react';
import PropTypes from 'prop-types';
import { TextLink } from 'components/Typography';
import MadeWithLove from './MadeWithLove';

import STYLES from './footer.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SRFooter = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <MadeWithLove />
    </footer>
  );
};

SRFooter.propTypes = {
  className: PropTypes.string,
};

SRFooter.defaultProps = {
  className: null,
};

export default SRFooter;
