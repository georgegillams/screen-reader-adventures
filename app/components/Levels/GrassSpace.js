import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import STYLES from './space.scss';
import GRASS_STYLES from './grass-space.scss';
import grass from './grass.svg';

const getClassName = cssModules({ ...STYLES, ...GRASS_STYLES });

class GrassSpace extends Component {
  render() {
    const { spaceNumber, children, ...rest } = this.props;

    return (
      <Space
        aria-label={`Space ${spaceNumber}`}
        role="paragraph"
        tabIndex={0}
        className={getClassName('grass-space__space')}
        {...rest}
      >
        <img
          aria-hidden
          className={getClassName('space__texture')}
          src={grass}
        />
        {children}
      </Space>
    );
  }
}

export default GrassSpace;
