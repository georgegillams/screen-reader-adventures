import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ObjectAsList from './ObjectAsList';

import { Section } from 'gg-components/dist/Typography';

class DebugObject extends Component {
  constructor(props) {
    super(props);

    this.state = { showDebug: false };
  }

  componentDidMount = () => {
    this.setState({
      showDebug:
        window.localStorage.getItem('showSessionDebugViews') === 'true',
    });
  };

  render = () => {
    if (!this.state.showDebug) {
      return null;
    }

    const { debugTitle, debugObject } = this.props;

    return (
      <Section
        style={{ backgroundColor: '#ed75ff' }}
        name={`${debugTitle || 'Debug object'}`}
      >
        <ObjectAsList value={debugObject} />
      </Section>
    );
  };
}

DebugObject.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  debugObject: PropTypes.object.isRequired,
  debugTitle: PropTypes.string,
};

DebugObject.defaultProps = {
  debugTitle: null,
};

export default DebugObject;
