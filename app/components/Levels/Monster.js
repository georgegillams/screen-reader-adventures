import React from 'react';
import { cssModules } from 'bpk-react-utils';
import monster from './monster.png';

import STYLES from './character.scss';

const getClassName = cssModules(STYLES);

const Character = props => (
  <img
    aria-hidden
    className={getClassName('character__character')}
    src={monster}
    {...props}
  />
);

export default Character;
