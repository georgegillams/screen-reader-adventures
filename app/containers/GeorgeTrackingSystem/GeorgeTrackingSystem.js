import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection } from 'components/Typography';
import GTSEntity from 'components/GTS';
import LoadingIndicator from 'components/LoadingIndicator';
import DeprecationNotice from 'containers/DeprecationNotice';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class GeorgeTrackingSystem extends React.Component {
  componentWillMount = () => {
    this.props.loadGtsLatest();
  };

  render() {
    const {
      loading,
      error,
      gtsLatest,
      loadGtsLatest,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [
      getClassName('pages__container'),
      getClassName('pages__container--centered'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Tracking" />
        <DeprecationNotice />
        {/* <LoadingIndicator loading={loading} error={error}>
          {!gtsLatest && (
            <Section name="No live tracking currently available">
              <Section name="🗺" />
            </Section>
          )}
          {gtsLatest && <GTSEntity gts={gtsLatest} />}
        </LoadingIndicator>*/}
      </div>
    );
  }
}

GeorgeTrackingSystem.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  gtsLatest: PropTypes.object,
  loadGtsLatest: PropTypes.func.isRequired,
  className: PropTypes.string,
};
