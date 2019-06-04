import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './barrier-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class CheckboxSpace extends Component {
  constructor(props) {
    super(props);

    this.state = { visited: false };
  }

  render() {
    const {
      children,
      disabled,
      value,
      onChange,
      onVisit,
      onClick,
      ...rest
    } = this.props;

    const classNames = [getClassName('space__space', 'barrier-space__space')];
    if (this.state.visited) {
      classNames.push(getClassName('space__space--visited'));
    }

    return (
      <div className={classNames.join(' ')} {...rest}>
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
      </div>
    );
  }
}
