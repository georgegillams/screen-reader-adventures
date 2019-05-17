import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';
import finishLineFlag from './finish_flag.png';

import STYLES from './goal-space.scss';

const getClassName = cssModules(STYLES);

export default class GoalSpace extends Component {
  render() {
    const { spaceNumber, children, ...rest } = this.props;

    return (
      <Space aria-label={`Space ${spaceNumber}. Goal`} {...rest}>
        <img
          className={getClassName('goal-space__flag')}
          src={finishLineFlag}
        />
        {children}
      </Space>
    );
  }
}
