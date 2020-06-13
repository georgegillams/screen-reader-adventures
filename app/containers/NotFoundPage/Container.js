import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

import STYLES from './not-found.scss';

const getClassName = cssModules(STYLES);

class NotFoundPage extends Component {
  render() {
    const { className } = this.props;
    const classNameFinal = [getClassName('not-found__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')}>
        <PageTitle
          className={getClassName('not-found__container')}
          name="Oops."
        >
          <SubSection anchor={false}>
            <Paragraph>
              The page you&apos;re looking for doesn&apos;t exist, or you
              don&apos;t have permission to view it.
              <br />
              Maybe the <TextLink href="/site-map">sitemap</TextLink> can help
            </Paragraph>
          </SubSection>
        </PageTitle>
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
