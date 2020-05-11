import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './open-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class OpenSpace extends Component {
  render() {
    const { children, spaceNumber, ...rest } = this.props;

    return (
      <Space
        role="paragraph"
        aria-label={`Move to space ${spaceNumber}. Goal`}
        className={getClassName('open-space__space')}
        tabIndex={0}
        {...rest}
      >
        {children}
      </Space>
    );
  }
}
