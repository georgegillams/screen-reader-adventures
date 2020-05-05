import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import { Section, SubSection } from 'gg-components/Typography';
import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import DeprecationNotice from 'containers/DeprecationNotice';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class GeorgeTrackingSystem extends React.Component {
  render() {
    const { className, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('pages__container--centered')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Tracking" />
        <DeprecationNotice />
      </div>
    );
  }
}

GeorgeTrackingSystem.propTypes = {
  className: PropTypes.string,
};

GeorgeTrackingSystem.defaultProps = {
  className: null,
};

export default GeorgeTrackingSystem;
