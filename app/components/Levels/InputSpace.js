import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './paragraph-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class InputSpace extends Component {
  render() {
    const { children, disabled, value, onClick, ...rest } = this.props;

    return (
      <div
        className={getClassName('space__space', 'paragraph-space__space')}
        {...rest}
      >
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
        <input
          disabled={disabled}
          onClick={() => {
            if (onClick && !disabled) {
              onClick();
            }
          }}
        />
      </div>
    );
  }
}
