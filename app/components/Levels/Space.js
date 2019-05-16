import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Character from './Character';

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
    if (this.state.visited) {
      classNames.push(getClassName('space__space--visited'));
    }

    return (
      <button
        aria-label={`space ${spaceNumber}`}
        onFocus={() => {
          if (!this.state.visited) {
            this.setState({ visited: true });
            if (onVisit) {
              onVisit();
            }
          }
          this.setState({ selected: true });
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
        {this.state.selected && (
          <div className={getClassName('space__shadow')} />
        )}
        {this.state.selected && <Character />}
      </button>
    );
  }
}
