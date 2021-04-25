import React from 'react';
import PropTypes from 'prop-types';
import PlatformSelector from 'components/PlatformSelector';
import { PageContainer } from 'gg-components/PageContainer';
import PageTitle from 'components/common/PageTitle';
import { Paragraph } from 'gg-components/Paragraph';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './home.scss';
const getClassName = cssModules(STYLES);

const HomePage = props => (
  <PageContainer centred>
    <PageTitle name="Welcome 👋" {...props}>
      <Paragraph>
        Learning to use a screen reader can be tedious and difficult. Screen Reader Adventures provides an effective way
        to learn with fun game stages, each introducing new shortcuts and techniques. When you can navigate all the
        stages of this game, you&apos;ll have the knowledge required to design and build more accessibile products.
      </Paragraph>
      <Paragraph>To get started, select the platform you wish to learn on.</Paragraph>
      <PlatformSelector className={getClassName('home__platform-selector')} />
    </PageTitle>
  </PageContainer>
);

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export default HomePage;
