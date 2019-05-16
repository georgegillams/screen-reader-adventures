import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';
import robot from './robot.png';

import STYLES from './character.scss';

const getClassName = cssModules(STYLES);

const Character = props => (
  <img
    className={getClassName('character__character')}
    src={robot}
    {...props}
  />
);

export default Character;
