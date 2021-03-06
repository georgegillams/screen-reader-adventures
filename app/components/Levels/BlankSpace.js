import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import STYLES from './blank-space.scss';

const getClassName = cssModules(STYLES);

export default class BlankSpace extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <div className={getClassName('blank-space__space')} {...rest} />;
  }
}
