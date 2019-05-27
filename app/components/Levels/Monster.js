import React from 'react';
import { cssModules } from 'bpk-react-utils';
import monster from './monster.png';

import STYLES from './character.scss';

const getClassName = cssModules(STYLES);

// const Monster = props => (
//   <img
//     aria-hidden
//     className={getClassName('character__character')}
//     src={monster}
//     {...props}
//   />
// );

const Monster = props => (
  <div aria-hidden className={getClassName('character__wrap')} {...props}>
    <div
      aria-hidden
      className={getClassName('character__box', 'character__box--danger')}
      {...props}
    />
  </div>
);

export default Monster;
