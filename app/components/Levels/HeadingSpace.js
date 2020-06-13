import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import GrassSpace from './GrassSpace';

import STYLES from './heading-space.scss';

const getClassName = cssModules(STYLES);

export default class HeadingSpace extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <GrassSpace role="heading" aria-level="2" tabIndex={0} {...rest}>
        <div
          aria-hidden="true"
          className={getClassName('heading-space__text-container')}
        >
          <span className={getClassName('heading-space__text')}>H</span>
        </div>
        {children}
      </GrassSpace>
    );
  }
}
