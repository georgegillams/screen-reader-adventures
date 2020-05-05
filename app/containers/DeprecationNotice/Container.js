import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './deprecation-notice.scss';

import { Section, SubSection, TextLink } from 'gg-components/Typography';

const getClassName = cssModules(STYLES);

class DeprecationNotice extends Component {
  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('deprecation-notice__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <Section
          className={getClassName('not-found__container')}
          name="This feature has been deprecated"
        >
          <SubSection anchor={false}>
            The page you&apos;re looking for has been deprecated, but you can
            find more awesome stuff in the{' '}
            <TextLink href="/site-map">sitemap</TextLink>.
          </SubSection>
        </Section>
      </main>
    );
  }
}

DeprecationNotice.propTypes = {
  className: PropTypes.string,
};

DeprecationNotice.defaultProps = {
  className: null,
};

export default DeprecationNotice;
