import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './loading-cover.scss';

import { SubSection } from 'gg-components/dist/Typography';
import DefaultSkeleton from 'components/Skeletons';

const getClassName = cssModules(STYLES);

const LoadingCover = props => {
  const { loadingSkeleton: LoadingSkeleton, loading, error, children } = props;

  const showLoadingMessage = loading || error;

  if (!showLoadingMessage) {
    return children || null;
  }

  return (
    <div className={getClassName('loading-cover__outer-container')}>
      <div className={getClassName('loading-cover__overlay')}>
        {LoadingSkeleton && <LoadingSkeleton aria-label="Loading" />}
        {error && (
          <SubSection
            name="This is taking a while. Maybe something isn't quite right..."
            noPadding
            anchor={false}
            className={getClassName('loading-cover__overlay--content')}
          />
        )}
      </div>
    </div>
  );
};

LoadingCover.propTypes = {
  loading: PropTypes.bool,
  loadingSkeleton: PropTypes.class,
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

LoadingCover.defaultProps = {
  loading: false,
  loadingSkeleton: DefaultSkeleton,
  error: false,
};

export default LoadingCover;
