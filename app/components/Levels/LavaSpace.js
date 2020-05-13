import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import STYLES from './lava-space.scss';

const getClassName = cssModules(STYLES);

export default class LavaSpace extends Component {
  render() {
    const { children, spaceNumber, ...rest } = this.props;

    return (
      <Space
        aria-label={`Move to space ${spaceNumber}. Goal`}
        className={getClassName('lava-space__space')}
        tabIndex={0}
        {...rest}
      >
        {children}
      </Space>
    );
  }
}
