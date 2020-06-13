import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PlatformSelector from 'components/PlatformSelector';
import { PageTitle, Paragraph } from 'gg-components/Typography';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class HomePage extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <PageTitle
        name="Welcome 👋"
        className={getClassName('pages__container--centered')}
      >
        <Helmet title="Home" />
        <Paragraph>
          Learning to use a screen reader can be tedious and difficult. Screen
          Reader Adventures provides an effective way to learn with fun game
          stages, each introducing new shortcuts and techniques. When you can
          navigate all the stages of this game, you&apos;ll have the knowledge
          required to design and build more accessibile products.
        </Paragraph>
        <br />
        <br />
        <Paragraph style={{ marginBottom: '4rem' }}>
          To get started, select the platform you wish to learn on.
        </Paragraph>
        <PlatformSelector />
      </PageTitle>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
