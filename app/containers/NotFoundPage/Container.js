import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './not-found.scss';

import { Section, SubSection, TextLink } from 'gg-components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class NotFoundPage extends Component {
  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('not-found__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <Section className={getClassName('not-found__container')} name="Oops.">
          <SubSection anchor={false}>
            The page you&apos;re looking for doesn&apos;t exist, or you
            don&apos;t have permission to view it.
            <br />
            Maybe the <TextLink href="/site-map">sitemap</TextLink> can help
          </SubSection>
        </Section>
      </main>
    );
  }
}

NotFoundPage.propTypes = {
  className: PropTypes.string,
};

NotFoundPage.defaultProps = {
  className: null,
};

export default NotFoundPage;
