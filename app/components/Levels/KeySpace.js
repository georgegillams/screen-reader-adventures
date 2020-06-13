import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import GrassSpace from './GrassSpace';

import STYLES from './space.scss';
import GRASS_STYLES from './key-space.scss';
import key from './key.svg';

const getClassName = cssModules({ ...STYLES, ...GRASS_STYLES });

class KeySpace extends Component {
  render() {
    const { showKey, spaceNumber, children, ...rest } = this.props;

    return (
      <GrassSpace
        aria-label={`Space ${spaceNumber}`}
        role="paragraph"
        tabIndex={0}
        className={getClassName('key-space__space')}
        {...rest}
      >
        {showKey && (
          <img
            aria-hidden
            className={getClassName('key-space__key')}
            src={key}
          />
        )}
        {children}
      </GrassSpace>
    );
  }
}

export default KeySpace;
