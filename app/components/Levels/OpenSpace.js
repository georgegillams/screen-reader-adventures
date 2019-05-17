import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import STYLES from './open-space.scss';

const getClassName = cssModules(STYLES);

export default class OpenSpace extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <div className={getClassName('open-space__space')} {...rest} />;
  }
}
