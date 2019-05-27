import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './open-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class OpenSpace extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <div className={getClassName('open-space__space')} {...rest}>
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
      </div>
    );
  }
}
