import React from 'react';
import { Section } from 'gg-components/Typography';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './game-over.scss';

const getClassName = cssModules(STYLES);

const GameOver = props => (
  <Section
    className={getClassName('game-over__game-over')}
    aria-live="polite"
    anchor={false}
    name="GAME OVER"
    {...props}
  />
);

export default GameOver;
