import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import GrassSpace from './GrassSpace';
import finishLineFlag from './finish-line-flag.svg';

import STYLES from './goal-space.scss';

const getClassName = cssModules(STYLES);

export default class GoalSpace extends Component {
  render() {
    const { spaceNumber, children, disabled, ...rest } = this.props;

    return (
      <GrassSpace
        aria-label={`Space ${spaceNumber}. Goal`}
        disabled={disabled}
        {...rest}
      >
        <img
          className={getClassName(
            'goal-space__flag',
            disabled ? null : 'goal-space__flag--enabled',
          )}
          src={finishLineFlag}
        />
        {children}
      </GrassSpace>
    );
  }
}
