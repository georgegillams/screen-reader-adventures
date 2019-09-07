import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './tech-specs.scss';

import { Section } from 'gg-components/dist/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const TechSpecs = props => {
  const { light, fancy, className, children, ...rest } = props;
  const outerClassNameFinal = [];
  if (className) {
    outerClassNameFinal.push(className);
  }

  const iconClassNameFinal = [getClassName('tech-specs__icon')];
  const darkIconClassNameFinal = [getClassName('tech-specs__icon')];
  iconClassNameFinal.push(getClassName('tech-specs__icon--no-light'));
  darkIconClassNameFinal.push(getClassName('tech-specs__icon--light-inverted'));

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <Section
        className={getClassName('tech-specs__container')}
        noPadding
        light={light}
        fancy={fancy}
      >
        Built in
        <a
          href="https://reactjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="react"
            width={5}
            height={5}
            className={[...darkIconClassNameFinal, 'tech-specs__icon--wide']
              .map(c => getClassName(c))
              .join(' ')}
            src="https://i.imgur.com/fDwM7UC.png"
          />
        </a>
        Hosted on
        <a
          href="https://www.heroku.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="heroku"
            width={5}
            height={5}
            className={darkIconClassNameFinal.join(' ')}
            src="https://i.imgur.com/4bHAQnH.png"
          />
        </a>
      </Section>
    </div>
  );
};

TechSpecs.propTypes = {
  light: PropTypes.bool,
  fancy: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

TechSpecs.defaultProps = {
  light: false,
  fancy: false,
  children: null,
  className: null,
};

export default TechSpecs;
