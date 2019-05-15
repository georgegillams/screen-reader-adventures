import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

class DefaultSkeleton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Skeleton style={{ width: '100%' }} height="100%" />;
  }
}

export default DefaultSkeleton;
