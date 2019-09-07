import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PlatformSelector from 'components/PlatformSelector';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class HomePage extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <div
        className={`${getClassName('pages__container')} ${getClassName(
          'pages__container--centered',
        )}`}
      >
        <Helmet title="Home" />
        <PlatformSelector />
      </div>
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
