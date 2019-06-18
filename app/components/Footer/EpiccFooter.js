import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import TechSpecs from './TechSpecs';
import STYLES from './footer.scss';

import { WessexCCPLogo } from 'components/Logo';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const EpiccFooter = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <WessexCCPLogo
        alwaysCentered
        className={getClassName('footer__logo')}
        noPadding
      />
    </footer>
  );
};

EpiccFooter.propTypes = {
  className: PropTypes.string,
};

EpiccFooter.defaultProps = {
  className: null,
};

export default EpiccFooter;
