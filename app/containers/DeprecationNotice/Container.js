import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

import STYLES from './deprecation-notice.scss';

const getClassName = cssModules(STYLES);

const DeprecationNotice = props => {
  const { className } = props;
  const classNameFinal = [getClassName('deprecation-notice__container')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')}>
      <PageTitle
        className={getClassName('not-found__container')}
        name="This feature has been deprecated"
      >
        <SubSection anchor={false}>
          <Paragraph>
            The page you&apos;re looking for has been deprecated, but you can
            find more awesome stuff in the{' '}
            <TextLink href="/site-map">sitemap</TextLink>.
          </Paragraph>
        </SubSection>
      </PageTitle>
    </main>
  );
};

DeprecationNotice.propTypes = {
  className: PropTypes.string,
};

DeprecationNotice.defaultProps = {
  className: null,
};

export default DeprecationNotice;
