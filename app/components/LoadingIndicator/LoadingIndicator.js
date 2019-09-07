import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './style.scss';

import { SubSection } from 'gg-components/dist/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const LoadingIndicator = props => {
  const { loading, error, children, ...rest } = props;

  if (!loading && !error) {
    return children;
  }

  return (
    <div className={getClassName('loading-indicator__outer')} {...rest}>
      <div className={getClassName('loading-indicator')}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      {error && (
        <SubSection
          anchor={false}
          name="This is taking a while. Maybe something isn't quite right..."
        />
      )}
    </div>
  );
};

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node,
};

LoadingIndicator.defaultProps = {
  loading: true,
  error: null,
  children: null,
};

export default LoadingIndicator;
