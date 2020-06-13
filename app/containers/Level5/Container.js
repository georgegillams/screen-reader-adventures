import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const levelDefinition = generateLevelDefinition([
    ['s'],
    ['l'],
    ['h'],
    ['l'],
    ['h'],
    ['l'],
    ['h'],
    ['l'],
    ['h'],
    ['g'],
  ]);

  // TODO Move to helpers
  const squareFromGameState = (gameState, x, y) => {
    if (gameState && gameState[x] && gameState[x][y]) {
      return gameState[x][y];
    }
    return null;
  };

  return (
    <LevelWrapper
      levelNumber={5}
      description={getCopy('level5Description')}
      level={levelDefinition}
      startSpace={{ x: 0, y: 0 }}
      oilSpills={[{ x: -2, y: 2, width: 5, height: 5 }]}
      {...props}
    />
  );
};

export default Container;
