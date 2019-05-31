import React from 'react';
import { Section } from 'components/Typography';
import { cssModules } from 'bpk-react-utils';

import STYLES from './game-over.scss';

const getClassName = cssModules(STYLES);

const GameOver = props => (
  <Section
    className={getClassName('game-over__game-over')}
    noAnchor
    name="GAME OVER"
    {...props}
  />
);

export default GameOver;
