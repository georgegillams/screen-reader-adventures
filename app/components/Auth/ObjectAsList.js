import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ObjectAsList extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
  }

  render = () => {
    const { name, value, depth } = this.props;

    if ((value && typeof value === 'object') || typeof value === 'array') {
      return (
        <Fragment>
          <div
            style={{ marginLeft: `${depth}rem` }}
            role="button"
            onClick={() => {
              this.setState({ expanded: !this.state.expanded });
            }}
          >{`${this.state.expanded ? '🔽' : '▶️'} ${name ||
            'top-level'}:`}</div>
          {this.state.expanded &&
            Object.keys(value).map(k => (
              <ObjectAsList name={k} value={value[k]} depth={depth + 1} />
            ))}
        </Fragment>
      );
    }

    return (
      <div style={{ marginLeft: `${depth}rem` }}>{`${name}: ${value}`}</div>
    );
  };
}

ObjectAsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  depth: PropTypes.number,
};

ObjectAsList.defaultProps = {
  depth: 0,
};

export default ObjectAsList;
