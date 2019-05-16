import React from 'react';
import PropTypes from 'prop-types';
import { Section, TextLink } from 'components/Typography';

import STYLES from './tech-specs.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MadeWithLove = props => {
  const { light, fancy, className, children, ...rest } = props;
  const outerClassNameFinal = [];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <Section light noPadding style={{ textAlign: 'center' }}>
        Made with ♥️ by{' '}
        <TextLink external light href="https://www.georgegillams.co.uk/">
          George Gillams
        </TextLink>
      </Section>
    </div>
  );
};

MadeWithLove.propTypes = {
  light: PropTypes.bool,
  fancy: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

MadeWithLove.defaultProps = {
  light: false,
  fancy: false,
  children: null,
  className: null,
};

export default MadeWithLove;
