import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import AboutPage from 'containers/About/About';
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
        <span
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            fontSize: '5rem',
            fontWeight: 'bold',
          }}
        >
          COMING SOON!
        </span>
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
