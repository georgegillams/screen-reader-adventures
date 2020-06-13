import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import STYLES from './space.scss';
import LAVA_STYLES from './lava-space.scss';
import lava from './lava.png';

const getClassName = cssModules({ ...STYLES, ...LAVA_STYLES });

class LavaSpace extends Component {
  render() {
    const { spaceNumber, children, ...rest } = this.props;

    return (
      <Space
        aria-label={`Space ${spaceNumber}`}
        role="paragraph"
        tabIndex={0}
        className={getClassName('lava-space__space')}
        {...rest}
      >
        <img
          aria-hidden
          className={getClassName('space__texture')}
          src={lava}
        />
        {children}
      </Space>
    );
  }
}

export default LavaSpace;
