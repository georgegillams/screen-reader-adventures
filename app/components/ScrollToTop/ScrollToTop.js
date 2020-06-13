/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  scrollToTop = () => {
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.scrollToTop();
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
