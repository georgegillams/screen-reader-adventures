import React from 'react';
import PropTypes from 'prop-types';

import LegacyPageContainer, { LAYOUT_STYLES } from 'components/common/LegacyPageContainer';
import Footer from 'components/Footer';
import STYLES from './common-layout.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const LegacyCommonLayout = props => {
  const { children, ...rest } = props;

  return (
    <>
      <LegacyPageContainer className={getClassName('common-layout__grow')} {...rest}>
        {children}
      </LegacyPageContainer>
      <Footer />
    </>
  );
};

LegacyCommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LegacyCommonLayout;
export { LAYOUT_STYLES };
