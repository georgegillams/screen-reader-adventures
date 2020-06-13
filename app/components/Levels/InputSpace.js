import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './input-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class InputSpace extends Component {
  constructor(props) {
    super(props);

    this.state = { visited: false };
  }

  render() {
    const {
      children,
      disabled,
      value,
      onChange,
      onVisit,
      onClick,
      ...rest
    } = this.props;

    const classNames = [getClassName('space__space', 'input-space__space')];
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
      <div className={classNames.join(' ')} {...rest}>
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
        <input
          disabled={disabled}
          className={getClassName('input-space__field')}
          value={value}
          onChange={onChange}
          onFocus={() => {
            if (onClick && !disabled) {
              onClick();
            }
            markVisited();
          }}
        />
      </div>
    );
  }
}
