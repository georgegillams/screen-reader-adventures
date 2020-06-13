import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';
const getClassName = cssModules(STYLES);

class Container extends Component {
  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('pages__container--centered')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <Section
          className={getClassName('not-found__container')}
          name="End of game."
        >
          <SubSection anchor={false}>
            I haven&apos;t yet made any more levels. Check back soon for more
            Screen Reader awesomeness!{' '}
          </SubSection>
        </Section>
      </main>
    );
  }
}

Container.propTypes = {
  className: PropTypes.string,
};

Container.defaultProps = {
  className: null,
};

export default Container;
