import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { THEMES } from 'gg-components/Theming';
import TextLink from 'components/common/TextLink';

import STYLES from './footer-nav.scss';

const getClassName = cssModules(STYLES);

const TechSpecs = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('footer-nav__container', className)} {...rest}>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/sitemap">
        Site map
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/status">
        Status
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/privacy-policy">
        Privacy
      </TextLink>
    </div>
  );
};

TechSpecs.propTypes = {
  className: PropTypes.string,
};

TechSpecs.defaultProps = {
  className: null,
};

export default TechSpecs;
