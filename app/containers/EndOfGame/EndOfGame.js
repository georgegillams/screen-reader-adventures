import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, SubSection, TextLink } from 'gg-components/Typography';

import STYLES from './not-found.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

class EndOfGame extends Component {
  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('not-found__container')];
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

EndOfGame.propTypes = {
  className: PropTypes.string,
};

EndOfGame.defaultProps = {
  className: null,
};

export default EndOfGame;
