import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './heading-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class HeadingSpace extends Component {
  render() {
    const { children, spaceNumber, ...rest } = this.props;

    return (
      <Space
        role="heading"
        aria-level="2"
        aria-label={`Move to space ${spaceNumber}. Goal`}
        className={getClassName('open-space__space')}
        tabIndex={0}
        {...rest}
      >
        <span aria-hidden="true">H</span>
        {children}
      </Space>
    );
  }
}
