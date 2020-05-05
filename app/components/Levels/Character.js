import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import STYLES from './character.scss';

const getClassName = cssModules(STYLES);

// const Character = props => (
//   <img
//     aria-hidden
//     className={getClassName('character__character')}
//     src={robot}
//     {...props}
//   />
// );

const Character = props => (
  <div aria-hidden className={getClassName('character__wrap')} {...props}>
    <div aria-hidden className={getClassName('character__box')} {...props} />
  </div>
);

export default Character;
