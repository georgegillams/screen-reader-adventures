import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const level = generateLevelDefinition([['g', 'h', 'l', 'h', 'k']]);
  level[0][3].getHint = gameState => {
    if (
      gameState &&
      gameState[0] &&
      gameState[0][3] &&
      gameState[0][3].visited
    ) {
      return null;
    }
    return getCopy('level4Hint1');
  };

  level[0][4].getHint = gameState => {
    if (
      gameState &&
      gameState[0] &&
      gameState[0][3] &&
      gameState[0][3].visited &&
      gameState[0][4] &&
      !gameState[0][4].visited
    ) {
      return getCopy('level4Hint2');
    }
    return null;
  };

  level[0][1].getHint = gameState => {
    if (
      gameState &&
      gameState[0] &&
      gameState[0][4] &&
      gameState[0][4].visited
    ) {
      return getCopy('level4Hint3');
    }
    return null;
  };

  level[0][0].condition = gameState =>
    gameState && gameState[0] && gameState[0][4] && gameState[0][4].visited;

  return (
    <LevelWrapper
      levelNumber={4}
      description={getCopy('level4Description')}
      level={level}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
