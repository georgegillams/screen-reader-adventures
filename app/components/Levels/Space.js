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
    const {
      spaceNumber,
      onClick,
      onSelect,
      onVisit,
      children,
      disabled,
      ...rest
    } = this.props;

    const classNames = [getClassName('space__space')];
    if (this.state.visited) {
      classNames.push(getClassName('space__space--visited'));
    }

    const markVisited = () => {
      if (!this.state.visited) {
        this.setState({ visited: true });
        if (onVisit) {
          onVisit();
        }
      }
    };

    return (
      <button
        aria-label={`Move to space ${spaceNumber}`}
        onClick={() => {
          if (onClick && !disabled) {
            onClick();
          }
          markVisited();
        }}
        onFocus={() => {
          this.setState({ selected: true });
          if (onSelect && !disabled) {
            onSelect();
          }
        }}
        onBlur={() => {
          this.setState({ selected: false });
        }}
        className={classNames.join(' ')}
        disabled={disabled}
        {...rest}
      >
        {children}
        {this.state.selected && (
          <div className={getClassName('space__shadow')} />
        )}
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
      </button>
    );
  }
}
