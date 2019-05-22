import React from 'react';
import { cssModules } from 'bpk-react-utils';
import monster from './monster.png';

import STYLES from './character.scss';

const getClassName = cssModules(STYLES);

export default class Monster {
  render() {
    const { ...props } = this.props;
    return (
      <img
        aria-hidden
        className={getClassName('character__character')}
        src={monster}
        {...props}
      />
    );
  }
}
