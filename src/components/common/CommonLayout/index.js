import React from 'react';
import PropTypes from 'prop-types';

import MainWrapper from 'components/common/MainWrapper';
import Footer from 'components/Footer';
import STYLES from './common-layout.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const CommonLayout = props => {
  const { children, ...rest } = props;

  return (
    <>
      <MainWrapper className={getClassName('common-layout__grow')} {...rest}>
        {children}
      </MainWrapper>
      <Footer />
    </>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
