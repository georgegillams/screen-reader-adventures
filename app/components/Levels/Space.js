import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './space.scss';

const getClassName = cssModules(STYLES);

export default class Space extends Component {
  constructor(props) {
    super(props);

    this.state = { visited: false, selected: false };
  }

  render() {
    const { spaceNumber, onSelect, onVisit, children, ...rest } = this.props;

    const classNames = [getClassName('space__space')];
    if (this.state.selected) {
      classNames.push(getClassName('space__space--selected'));
    }
    if (this.state.visited) {
      classNames.push(getClassName('space__space--visited'));
    }

    return (
      <button
        aria-label={`space ${spaceNumber}`}
        onFocus={() => {
          if (!this.state.visited) {
            this.setState({ selected: true, visited: true });
            if (onVisit) {
              onVisit();
            }
          }
          if (onSelect) {
            onSelect();
          }
        }}
        onBlur={() => {
          this.setState({ selected: false });
        }}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
